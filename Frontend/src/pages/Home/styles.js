import styled from 'styled-components';
import backgroundImage from '../../assets/game.jpg';

// Cria um componente Container que será a área principal da aplicação
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem;
  box-sizing: border-box;
`;

// Cria o componente Title usado para o título principal
export const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px #000000;
  margin-bottom: 1rem;
`;

// Cria o componente Input usado para campos de entrada de texto/número
export const Input = styled.input`
  margin: 0.5rem;
  padding: 0.7rem;
  width: 260px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

// Cria o componente Button usado para botões clicáveis
export const Button = styled.button`
  padding: 0.7rem 1.2rem;
  margin: 0.5rem;
  background-color: #1e90ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0f65c0;
  }
`;

// Cria o componente Feedback usado para mostrar mensagens para o usuário
export const Feedback = styled.p`
  font-size: 1.3rem;
  color: #fff;
  text-shadow: 1px 1px 2px #000000;
  margin-top: 1rem;
`;
