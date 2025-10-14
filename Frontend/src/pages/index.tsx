import { useEffect } from "react";
import "../App.css";
import Formulario from "../components/formulario";
import { useFormularioStore } from "../store/formulario";
import { useAlertStore } from "../store/alert";
import Alert from "../components/alert";

function Index() {
  const { name, phone, password, image, new_account, setNewAccount } =
    useFormularioStore();

  const { message, setMessage } = useAlertStore();

  useEffect(() => {
    if (phone !== "") {
      console.log("Nombre:", name);
      console.log("Teléfono:", phone);
      console.log("Contraseña:", password);
      console.log("Imagen:", image);
    }

    useFormularioStore.setState({
      name: "",
      phone: "",
      password: "",
      image: null,
    });
  }, [name, phone, password, image]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // Limpia el mensaje después de 3 segundos

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta o el mensaje cambia
    }
  }, [message, setMessage]);

  const handleSubmit = () => {
    setNewAccount(!new_account);
  };

  return (
    <>
      {message ? <Alert message_alert={message!} /> : null}

      <div className="flex flex-col min-h-screen">
        <header className="bg-primary w-full h-[222px] pt-7">
          <div className="flex items-center gap-x-4 max-w-6xl mx-auto px-4">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontSize: "40px" }}
            >
              chat_bubble
            </span>
            <span className="text-white text-base font-medium tracking-wider uppercase">
              ChatApp Web
            </span>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center bg-main">
          <div className="w-full max-w-6xl -mt-[180px] mx-auto px-4">
            <div className="bg-panel rounded-xl shadow-lg  overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-12 md:p-16 flex flex-col justify-center text-center md:text-left">
                  <h1 className="text-3xl lg:text-4xl font-light text-text-light dark:text-text-dark mb-4">
                    {new_account ? "Crea tu cuenta" : "Inicia sesión"}
                  </h1>
                  <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                    Únete a nuestra comunidad y comienza a chatear. Es rápido,
                    fácil y seguro.
                  </p>
                  <p className="mt-8 text-sm text-text-muted-light dark:text-text-muted-dark">
                    {new_account
                      ? "¿Ya tienes una cuenta? "
                      : "¿No tienes una cuenta? "}
                    <a
                      className="text-primary hover:text-primary-hover dark:hover:text-primary-hover font-medium hover:underline cursor-pointer"
                      onClick={handleSubmit}
                    >
                      {new_account ? "Inicia sesión" : "Crear Cuenta"}
                    </a>
                  </p>
                </div>

                <Formulario />
              </div>
            </div>
            <p className="text-center text-xs text-text-muted-light dark:text-text-muted-dark mt-8">
              Al hacer clic en "Crear Cuenta", aceptas nuestras{" "}
              <a className="text-primary hover:underline" href="#">
                Condiciones
              </a>{" "}
              y{" "}
              <a className="text-primary hover:underline" href="#">
                Política de privacidad
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Index;
