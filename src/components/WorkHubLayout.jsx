import React, {useState} from 'react';
import {Link, Outlet} from 'react-router';
import {useTranslation} from 'react-i18next';
import {useUserContext} from './hooks/contextHooks.js';

const WorkHubLayout = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex bg-[#0d0f0e] font-sans text-white">
      <aside
        className={`flex min-h-screen flex-col items-center gap-4 border-r border-gray-800 bg-[#0d0f0e] text-white transition-all duration-300 ${
          isMenuOpen ? 'w-64' : 'w-0'
        }`}
      >
        {isMenuOpen && (
          <>
            <h1 className="mt-2 border border-yellow-500 p-2 px-10 text-xl font-bold text-white">
              {t('workhubHeader.workhub')}
            </h1>
            <nav>
              <ul className="flex flex-col items-center gap-4 text-sm tracking-wider text-white underline underline-offset-4">
                {user.role === 'admin' && (
                  <li>
                    <Link to="manage-menu" className="hover:text-yellow-500">
                      {t('workhubHeader.manage-menu')}
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="orders" className="hover:text-yellow-500">
                    {t('workhubHeader.orders')}
                  </Link>
                </li>
                {user.role === 'admin' && (
                  <li>
                    <Link to="users" className="hover:text-yellow-500">
                      {t('workhubHeader.users')}
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="reservations" className="hover:text-yellow-500">
                    {t('workhubHeader.reservations')}
                  </Link>
                </li>
                <li>
                  <Link to="contact-messages" className="hover:text-yellow-500">
                    {t('workhubHeader.contact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </aside>
      <main
        className={`flex-grow transition-all duration-300 ${isMenuOpen ? 'ml-10' : 'ml-0'}`}
      >
        <button
          onClick={toggleMenu}
          title={t('workhubHeader.toggle-menu')}
          className="z-10 mx-2 mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-black hover:bg-yellow-600"
        >
          {isMenuOpen ? '←' : '→'}
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default WorkHubLayout;
