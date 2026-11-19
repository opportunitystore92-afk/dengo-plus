import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(e) {
    e.preventDefault();
    setErro("");

    const userLimpo = nome.trim().replace("@", "");
    const contatoLimpo = contato.trim();
    const senhaLimpa = senha.trim();

    if (!userLimpo) {
      setErro("Escreve o teu nome");
      return;
    }

    if (!contatoLimpo) {
      setErro("Escreve o teu email ou telefone");
      return;
    }

    if (!senhaLimpa) {
      setErro("Escreve a tua senha");
      return;
    }

    if (userLimpo.toLowerCase() === "alves" && senhaLimpa !== "1234") {
      setErro("Senha errada para o Alves (usa 1234)");
      return;
    }

    const isEmail = contatoLimpo.includes("@");

    const user = {
      username: userLimpo,
      name: userLimpo,
      email: isEmail ? contatoLimpo : "",
      phone: !isEmail ? contatoLimpo : "",
      avatar:
        userLimpo.toLowerCase() === "alves"
          ? "/alves.png"
          : userLimpo[0].toUpperCase(),
    };

    localStorage.setItem("dengo_user", JSON.stringify(user));
    localStorage.setItem("dengoo_user", JSON.stringify(user));
    localStorage.setItem("dengo_user_session", JSON.stringify(user));

    const voltarPara = localStorage.getItem("dengo_voltar_para");
    localStorage.removeItem("dengo_voltar_para");

    if (voltarPara && !voltarPara.includes("/auth/signin")) {
      router.push(voltarPara);
    } else if (window.location.pathname.startsWith("/detail")) {
      router.push(window.location.pathname + "?logado=1");
    } else {
      router.push("/");
    }
  }

  const inputStyle = {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 10,
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    marginTop: 4,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    background: "#000",
    color: "#fff",
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: 20,
        textAlign: "center",
      }}
    >
      <h1>Entrar no Dengo</h1>
      <p>Como nos apps grandes: email ou telefone</p>

      <form onSubmit={entrar}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome - ex: Alves"
          style={inputStyle}
        />

        <input
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          placeholder="Email ou Telefone"
          style={inputStyle}
        />

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha - ex: 1234"
          style={inputStyle}
        />

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <button type="submit" style={buttonStyle}>
          Entrar e continuar
        </button>
      </form>
    </div>
  );
}