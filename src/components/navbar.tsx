/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import Container from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { cx } from "@/utils/all";

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
  children?: MenuItem[];
}

// Configuração para ambas as versões da logo
const logoLight = {
  src: "/pds-logo.svg",
  width: 120,
  height: 40,
  alt: "Prédios de Salvador"
};

const logoDark = {
  src: "/pds-logo-dark.svg", // Versão da logo para tema escuro
  width: 120,
  height: 40,
  alt: "Prédios de Salvador"
};

interface NavbarProps {
  logo?: unknown;
  logoalt?: unknown;
}

export default function Navbar() {
  const leftmenu: MenuItem[] = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Sobre",
      href: "/sobre"
    }
  ];

  const rightmenu: MenuItem[] = [
    {
      label: "Mapa",
      href: "/mapa"
    },
    {
      label: "Contato",
      href: "/contato"
    }
  ];

  const mobilemenu: MenuItem[] = [...leftmenu, ...rightmenu];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                  {leftmenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children ? (
                        <DropdownMenu
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener" : undefined}>
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between md:w-auto">
                  <Link href="/" className="w-28 dark:hidden">
                    {/* Logo para modo claro */}
                    <Image
                      src={logoLight.src}
                      alt={logoLight.alt}
                      width={logoLight.width}
                      height={logoLight.height}
                      priority={true}
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </Link>
                  <Link href="/" className="hidden w-28 dark:block">
                    {/* Logo para modo escuro */}
                    <Image
                      src={logoDark.src}
                      alt={logoDark.alt}
                      width={logoDark.width}
                      height={logoDark.height}
                      priority={true}
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 md:hidden ">
                    <svg
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                  {rightmenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children ? (
                        <DropdownMenu
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener" : undefined}>
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-cyan-200 dark:text-blue-800 ">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
              <Disclosure.Panel>
                <div className="order-2 -ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children ? (
                        <DropdownMenu
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                          mobile={true}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          className="w-full px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener" : undefined}>
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}

interface DropdownMenuProps {
  menu: MenuItem;
  items: MenuItem[];
  mobile?: boolean;
}

const DropdownMenu = ({ menu, items, mobile }: DropdownMenuProps) => {
  return (
    <Menu as="div" className={cx("relative text-left", mobile && "w-full")}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center gap-x-1 rounded-md px-5 py-2 text-xl font-medium outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
              open
                ? "text-blue-500 hover:text-blue-500"
                : "text-gray-600 dark:text-gray-400",
              mobile ? "w-full px-4 py-2" : "inline-block px-4 py-2"
            )}>
            <span>{menu.label}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="lg:transition lg:ease-out lg:duration-100"
            enterFrom="lg:transform lg:opacity-0 lg:scale-95"
            enterTo="lg:transform lg:opacity-100 lg:scale-100"
            leave="lg:transition lg:ease-in lg:duration-75"
            leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
            leaveTo="lg:transform lg:opacity-0 lg:scale-95">
            <Menu.Items
              className={cx(
                "z-20 origin-top-left rounded-md focus:outline-none lg:absolute lg:left-0 lg:w-56",
                !mobile && "bg-white shadow-lg dark:bg-gray-800"
              )}>
              <div className={cx(!mobile && "py-3")}>
                {items.map((item, index) => (
                  <Menu.Item as="div" key={`${item.label}${index}`}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={cx(
                          "flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
                          active
                            ? "text-blue-500"
                            : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                        )}>
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};