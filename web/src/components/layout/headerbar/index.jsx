/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { useHeaderBar } from '../../../hooks/common/useHeaderBar';
import { useNotifications } from '../../../hooks/common/useNotifications';
import { useNavigation } from '../../../hooks/common/useNavigation';
import NoticeModal from '../NoticeModal';
import MobileMenuButton from './MobileMenuButton';
import HeaderLogo from './HeaderLogo';
import Navigation from './Navigation';
import ActionButtons from './ActionButtons';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import NotificationButton from './NotificationButton';
import UserArea from './UserArea';

const HeaderBar = ({ onMobileMenuToggle, drawerOpen }) => {
    const {
        userState,
        statusState,
        isMobile,
        collapsed,
        logoLoaded,
        currentLang,
        isLoading,
        systemName,
        logo,
        isNewYear,
        isSelfUseMode,
        docsLink,
        isDemoSiteMode,
        isConsoleRoute,
        theme,
        headerNavModules,
        pricingRequireAuth,
        logout,
        handleLanguageChange,
        handleThemeToggle,
        handleMobileMenuToggle,
        navigate,
        t,
    } = useHeaderBar({ onMobileMenuToggle, drawerOpen });

    const {
        noticeVisible,
        unreadCount,
        handleNoticeOpen,
        handleNoticeClose,
        getUnreadKeys,
    } = useNotifications(statusState);

    const { mainNavLinks } = useNavigation(t, docsLink, headerNavModules);
    const isPublicRoute = !isConsoleRoute;
    const docsLangPrefix = currentLang.startsWith('zh') ? 'zh' : 'en';
    const docsHref = docsLink || `https://allrouter.ai/${docsLangPrefix}/docs`;
    const isLoggedIn = Boolean(userState?.user);
    const consoleNavTarget = isLoggedIn ? '/console' : '/login';
    const pricingNavTarget =
        !isLoggedIn && pricingRequireAuth ? '/login' : '/pricing';
    const headerClassName = isPublicRoute
        ? 'landing-v2-nav landing-v2-nav-shell'
        : 'landing-v2-nav landing-v2-nav-shell landing-v2-nav-console';

    return (
        <header className={headerClassName}>
            <NoticeModal
                visible={noticeVisible}
                onClose={handleNoticeClose}
                isMobile={isMobile}
                defaultTab={unreadCount > 0 ? 'system' : 'inApp'}
                unreadKeys={getUnreadKeys()}
            />
            {isPublicRoute ? (
                <>
                    <Link to='/' className='landing-v2-logo'>
                        <img
                            src={logo || '/logo.png'}
                            alt={`${systemName} Logo`}
                            className='landing-v2-real-logo'
                        />
                        <span>{systemName}</span>
                    </Link>

                    <div className='landing-v2-nav-links'>
                        <Link to={consoleNavTarget}>{t('控制台')}</Link>
                        <Link to={pricingNavTarget}>{t('模型广场')}</Link>
                        <a href={docsHref} target='_blank' rel='noreferrer'>
                            {t('文档')}
                        </a>
                        <Link to='/about'>{t('关于')}</Link>
                    </div>

                    <div className='landing-v2-nav-actions'>
                        <div className='landing-v2-nav-tools'>
                            <NotificationButton
                                unreadCount={unreadCount}
                                onNoticeOpen={handleNoticeOpen}
                                t={t}
                            />
                            <ThemeToggle
                                theme={theme}
                                onThemeToggle={handleThemeToggle}
                                t={t}
                            />
                            <LanguageSelector
                                currentLang={currentLang}
                                onLanguageChange={handleLanguageChange}
                                t={t}
                            />
                        </div>
                        {isLoggedIn ? (
                            <UserArea
                                userState={userState}
                                isLoading={isLoading}
                                isMobile={isMobile}
                                isSelfUseMode={isSelfUseMode}
                                logout={logout}
                                navigate={navigate}
                                t={t}
                            />
                        ) : (
                            <>
                                <Link to='/login' className='landing-v2-btn-text'>
                                    {t('登录')}
                                </Link>
                                <Link to={consoleNavTarget} className='landing-v2-btn-primary'>
                                    {t('获取密钥')}
                                </Link>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div className='w-full px-2'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center'>
                            <MobileMenuButton
                                isConsoleRoute={isConsoleRoute}
                                isMobile={isMobile}
                                drawerOpen={drawerOpen}
                                collapsed={collapsed}
                                onToggle={handleMobileMenuToggle}
                                t={t}
                            />

                            <HeaderLogo
                                isMobile={isMobile}
                                isConsoleRoute={isConsoleRoute}
                                logo={logo}
                                logoLoaded={logoLoaded}
                                isLoading={isLoading}
                                systemName={systemName}
                                isSelfUseMode={isSelfUseMode}
                                isDemoSiteMode={isDemoSiteMode}
                                t={t}
                            />
                        </div>

                        <Navigation
                            mainNavLinks={mainNavLinks}
                            isMobile={isMobile}
                            isLoading={isLoading}
                            userState={userState}
                            pricingRequireAuth={pricingRequireAuth}
                        />

                        <ActionButtons
                            isNewYear={isNewYear}
                            unreadCount={unreadCount}
                            onNoticeOpen={handleNoticeOpen}
                            theme={theme}
                            onThemeToggle={handleThemeToggle}
                            currentLang={currentLang}
                            onLanguageChange={handleLanguageChange}
                            userState={userState}
                            isLoading={isLoading}
                            isMobile={isMobile}
                            isSelfUseMode={isSelfUseMode}
                            logout={logout}
                            navigate={navigate}
                            t={t}
                        />
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderBar;
