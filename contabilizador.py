import tkinter as tk
from tkinter import messagebox
import requests
import time
import threading
import json
import os

# Configurações
API_URL_LOGIN = 'http://localhost:3005/projeto/buscar-projeto-ao-usuario'
API_URL_TRACK_TIME = 'http://localhost:3005/projeto/enviar-tempo'
CONFIG_FILE = 'config.json'

# Variáveis globais para armazenar o ID do usuário, nome e dados de login
user_id = None
user_name = None
user_email = None
project_code = None

# Funções de carregamento e salvamento de configurações
def load_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as file:
            return json.load(file)
    return {}

def save_config(username, project_code):
    with open(CONFIG_FILE, 'w') as file:
        json.dump({'username': username, 'project_code': project_code}, file)

# Funções de rastreamento de tempo
class TimeTracker:
    def __init__(self):
        self.start_time = None
        self.total_time = 0
        self.running = False
        self.inactivity_threshold = 180  # 3 minutos
        self.last_active_time = time.time()

    def start(self):
        self.running = True
        self.start_time = time.time()
        self.last_active_time = time.time()
        self.track_time()
        time_tracking_window.iconify()

    def stop(self):
        self.running = False
        if self.start_time:
            self.total_time += (time.time() - self.start_time)
            self.start_time = None

    def track_time(self):
        def run():
            while self.running:
                current_time = time.time()
                if current_time - self.last_active_time >= self.inactivity_threshold:
                    self.stop()
                    root.after(0, center_window)
                    root.after(0, time_tracking_window.deiconify)
                    update_ui_for_inactive()
                time.sleep(60)  # Verifica a cada minuto
                if self.running:
                    self.send_time_data()
                    self.last_active_time = time.time()

        threading.Thread(target=run, daemon=True).start()

    def send_time_data(self):
        data = {
            'id_usuario': user_id,
            'tempo': self.total_time / 60  # Converte para minutos
        }
        print(f"Tempo enviado: {data}")
        try:
            response = requests.post(API_URL_TRACK_TIME, json=data)
            response.raise_for_status()
            print(f"Tempo enviado: {self.total_time / 60:.2f} minutos")
        except requests.RequestException as e:
            print(f"Falha ao enviar tempo: {e}")

time_tracker = TimeTracker()

def update_ui_for_inactive():
    start_button.config(state=tk.NORMAL)  # Reativa o botão "Iniciar"

def update_timer():
    if time_tracker.running:
        elapsed_time = time_tracker.total_time + (time.time() - time_tracker.start_time)
        minutes = int(elapsed_time // 60)
        seconds = int(elapsed_time % 60)
        timer_label.config(text=f"Tempo Total: {minutes}m {seconds}s")
    root.after(1000, update_timer)  # Atualiza a cada segundo

def submit_form():
    global user_email, project_code

    email = username_entry.get()
    codigo = project_code_entry.get()

    if not email or not codigo:
        messagebox.showwarning("Aviso", "Preencha todos os campos.")
        return

    data = {
        'email': email,
        'codigo': codigo
    }

    try:
        response = requests.post(API_URL_LOGIN, json=data)
        response.raise_for_status()

        result = response.json()
        print(f"Dados retornados pela API: {result}")

        global user_id, user_name
        user_id = result['body']['usuario']['id']
        user_name = result['body']['usuario']['nome']
        user_email = result['body']['usuario']['email']  # Salva o email
        project_code = result['body']['projeto']['id']  # Salva o código do projeto

        messagebox.showinfo("Sucesso", f"Dados recebidos: {result}")

        save_config(email, codigo)
        root.withdraw()
        open_time_tracking_screen()
    except requests.HTTPError as http_err:
        try:
            error_response = http_err.response.json()
            error_message = error_response.get('message', 'Erro desconhecido')
            print(f"Erro HTTP: {error_message}")
            messagebox.showerror("Erro", f"Erro HTTP: {error_message}")
        except ValueError:
            print(f"Erro HTTP: {http_err}")
            messagebox.showerror("Erro", f"Erro HTTP: {http_err}")
    except requests.RequestException as req_err:
        print(f"Erro na solicitação: {req_err}")
        messagebox.showerror("Erro", f"Falha ao enviar dados: {req_err}")

def open_time_tracking_screen():
    global time_tracking_window, timer_label, start_button
    time_tracking_window = tk.Toplevel(root)
    time_tracking_window.title("Rastreamento de Horas")

    tk.Label(time_tracking_window, text=f"Bem-vindo, {user_name}").pack(pady=10)
    tk.Label(time_tracking_window, text="Tela de Rastreamento de Horas").pack(pady=10)
    
    timer_label = tk.Label(time_tracking_window, text="Tempo Total: 0m 0s")
    timer_label.pack(pady=10)

    start_button = tk.Button(time_tracking_window, text="Iniciar", command=start_tracking)
    start_button.pack(pady=20)

    center_window()
    update_timer()

def start_tracking():
    start_button.config(state=tk.DISABLED)  # Desativa o botão "Iniciar"
    time_tracker.start()

def center_window():
    window_width = time_tracking_window.winfo_reqwidth()
    window_height = time_tracking_window.winfo_reqheight()
    screen_width = time_tracking_window.winfo_screenwidth()
    screen_height = time_tracking_window.winfo_screenheight()
    x = (screen_width // 2) - (window_width // 2)
    y = (screen_height // 2) - (window_height // 2)
    time_tracking_window.geometry(f"{window_width}x{window_height}+{x}+{y}")

# Configuração da interface gráfica
root = tk.Tk()
root.title("Tela Inicial")

config = load_config()

tk.Label(root, text="Nome de Usuário").pack(pady=5)
username_entry = tk.Entry(root)
username_entry.pack(pady=5)
username_entry.insert(0, config.get('username', ''))

tk.Label(root, text="Código do Projeto").pack(pady=5)
project_code_entry = tk.Entry(root)
project_code_entry.pack(pady=5)
project_code_entry.insert(0, config.get('project_code', ''))

submit_button = tk.Button(root, text="Enviar", command=submit_form)
submit_button.pack(pady=20)

root.mainloop()
