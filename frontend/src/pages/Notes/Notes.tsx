import React from "react";
import "./Notes.scss";
import ButtonCommon from "../../components/ButtonCommon/ButtonCommon";
import Card from "../../components/Card/Card";
import { FormEvent, useRef, useState } from "react";
import axiosClient from "../../axios-client.ts";

function Notes() {
    // Valor inicial das variáveis que controlam o estado do valor do formulário do nome e descrição
    const [nomeValor, setNomeValor] = useState("");
    const [descValor, setDescValor] = useState("");

    // Aqui eu criei separado uma função que seta o valor para o atual valor digitado, ela é disparada sempre que tem mudanças com o evento onchange. Sem ela seria impossível digitar no campo do formulário, já que a variável lá é um state que não mudaria o valor
    const nomeMudanca = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setNomeValor(evento.target.value);
    };

    const descMudanca = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setDescValor(evento.target.value);
    };

    // Aqui estou guardando em uma variável react o campo nome do formulário e o de descrição, a ideia é usar como usaria o DOM. Se eu fizesse isso aqui com useState (que também dá pra fazer), ficaria mais pesado porque ia medir cada atualização, já esse vai ser usado só quando enviar.
    const nomeRef = useRef<HTMLInputElement>(null);
    const descricaoRef = useRef<HTMLInputElement>(null);

    const submit = (evento: FormEvent) => {
        evento.preventDefault(); // prevenindo que ele atualize a página que é o comportamento padrão
        if (nomeRef.current && descricaoRef.current) {
            // aqui eu salvo os valores digitados nos campos depois de conferir que eles existem, mais tarde vou enviar essa variável dados para a database através de um post
            const dados = {
                nome: nomeRef.current.value,
                descricao: descricaoRef.current.value,
            };
            setNomeValor(""); // setando o valor do campo nome para vazio, para limpar o campo depois do botão ser pressionado
            setDescValor(""); // setando o valor do campo desc para vazio, para limpar o campo depois do botão ser pressionado
            axiosClient.post("/notes", dados).then(() => {
                console.log("oi");
            });
        }
    };

    return (
        <>
            <form onSubmit={submit} className="novoFormulario" action="">
                <input
                    value={nomeValor}
                    ref={nomeRef}
                    onChange={nomeMudanca}
                    placeholder="Escreva um nome para a tarefa"
                    type="text"
                />

                <input
                    value={descValor}
                    ref={descricaoRef}
                    onChange={descMudanca}
                    placeholder="Descreva como gostaria de ser lembrado desta tarefa"
                    type="text"
                />

                <div className="botoesForm">
                    <ButtonCommon conteudo="fechar" largura="50%" />
                    <ButtonCommon conteudo="postar" largura="50%" />
                </div>
            </form>

            <Card nome="Minha tarefa" descricao="o que eu quiser" />
            <Card nome="Minha tarefa" descricao="o que eu quiser" />
            <Card
                nome="Minha tarefa"
                descricao="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa repudiandae maiores laborum, velit nemo officia, minus, cupiditate accusamus architecto labore autem voluptates fuga illum rerum sed natus doloribus officiis corrupti?"
            />
        </>
    );
}

export default Notes;
