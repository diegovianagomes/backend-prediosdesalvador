import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  large?: boolean;
  alt?: boolean;
  className?: string;
}

export default function Container(props:  ContainerProps) {
  return (
    <div
      className={`container px-8 mx-auto xl:px-5 ${
        props.large ? "max-w-screen-xl" : "max-w-screen-lg"
      } ${!props.alt && "py-0 lg:py-0"} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}