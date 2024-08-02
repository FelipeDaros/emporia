import { Button, ButtonProps } from "@material-tailwind/react";

type Props = ButtonProps & {};

export function ButtonDefault({ children, loading, ...rest }: Props) {
  return (
    <Button className="items-center justify-center" loading={loading} {...rest}>
      {children}
    </Button>
  );
}
