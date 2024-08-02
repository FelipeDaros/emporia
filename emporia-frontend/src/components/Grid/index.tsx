import { Button, Card, CardHeader, IconButton, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { UserPlusIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilIcon, MagnifyingGlassIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "../../ultis/deboouce";
import { unknown } from "zod";

type Props = {
  endPoint: string;
  onDelete?: (id: number, fetchData: () => void) => void;
  onEdit?: (id: number) => void;
  routeCreated?: string;
  title: string;
  subTitle: string;
};

type DataItem = {
  id: number;
  [key: string]: any;
};

export function DefaultGrid({ endPoint, routeCreated, title, subTitle, onDelete, onEdit }: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState<DataItem[]>([]);
  const [tableHead, setTableHead] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const debouncedFetchData = useDebounce(() => fetchData(search), 1000);

  const getItemProps = (index: number) => ({
    variant: activePage === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActivePage(index),
  } as any);

  const next = () => {
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  const prev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  async function fetchData(searchValue?: string) {
    try {
      const { data: responseData } = await api.get(endPoint, {
        params: {
          search: searchValue,
          take: itemsPerPage,
          skip: (activePage - 1) * itemsPerPage,
        },
      });
      const responseBody = responseData.body;
      const totalItems = responseData.count; // Adjusted to match the correct key

      setData(responseBody);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));

      // Dynamically set table headers based on keys of the first item
      if (responseBody.length > 0) {
        const headers = Object.keys(responseBody[0]);
        setTableHead(headers);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!search) {
      fetchData();
    } else {
      debouncedFetchData();
    }
  }, [activePage, itemsPerPage, search]);

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count);
    setActivePage(1); // Reset to first page when items per page change
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {subTitle}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Input
              crossOrigin={unknown}
              label="Procurar"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
            {routeCreated && (
              <Button className="flex items-center gap-3" size="sm" onClick={() => navigate(routeCreated)}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 uppercase">
                  {head}
                </Typography>
              </th>
            ))}
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={tableHead.length + 1} className="p-4 text-center">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Nenhum dado encontrado
                </Typography>
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";

              return (
                <tr key={item.id}>
                  {tableHead.map((head) => (
                    <td key={head} className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item[head]}
                      </Typography>
                    </td>
                  ))}
                  <td className={classes}>
                    <div className="flex flex-row">
                      {onEdit && (
                        <PencilIcon onClick={() => onEdit(item.id)} className="size-6 text-black hover:cursor-pointer" />
                      )}
                      {onDelete && (
                        <TrashIcon onClick={() => onDelete(item.id, fetchData)} className="size-6 text-red-400 hover:cursor-pointer" />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="flex justify-center my-2 items-center p-2">
        <div className="flex justify-center items-center flex-1">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={activePage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <IconButton key={i + 1} {...getItemProps(i + 1)}>
                {i + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="text"
            size="sm"
            className="flex items-center gap-2"
            onClick={next}
            disabled={activePage === totalPages || !data.length}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-0 mr-2 flex gap-1 items-center justify-center border-2 border-gray-600 rounded-md p-1">
          <Button className="w-6 h-6 flex items-center justify-center" variant={itemsPerPage === 10 ? "filled" : "text"} onClick={() => handleItemsPerPageChange(10)}>10</Button>
          <Button className="w-6 h-6 flex items-center justify-center" variant={itemsPerPage === 25 ? "filled" : "text"} onClick={() => handleItemsPerPageChange(25)}>25</Button>
          <Button className="w-6 h-6 flex items-center justify-center" variant={itemsPerPage === 50 ? "filled" : "text"} onClick={() => handleItemsPerPageChange(50)}>50</Button>
        </div>
      </div>
    </Card>
  );
}
