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

import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { API, showError } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { UserContext } from '../../context/User';
import { useActualTheme, useSetTheme, useTheme } from '../../context/Theme';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import ThemeToggle from '../../components/layout/headerbar/ThemeToggle';
import LanguageSelector from '../../components/layout/headerbar/LanguageSelector';
import NotificationButton from '../../components/layout/headerbar/NotificationButton';
import UserArea from '../../components/layout/headerbar/UserArea';

import Logo from '../../../public/logo.png';

import openaiLogo from '../../../public/logos/openai.svg';
import anthropicLogo from '../../../public/logos/anthropic.svg';
import googleLogo from '../../../public/logos/google.svg';
import metaLogo from '../../../public/logos/meta.svg';
import huggingFaceLogo from '../../../public/logos/huggingface.svg';
import kimiLogo from '../../../public/logos/kimi.svg';
import deepseekLogo from '../../../public/logos/deepseek.svg';
import zhipuLogo from '../../../public/logos/zhipu.svg';

const partnerLogos = [
  { src: openaiLogo, alt: 'OpenAI' },
  { src: anthropicLogo, alt: 'Anthropic' },
  { src: googleLogo, alt: 'Google' },
  { src: metaLogo, alt: 'Meta' },
  { src: huggingFaceLogo, alt: 'Hugging Face' },
  { src: kimiLogo, alt: 'Kimi' },
  { src: deepseekLogo, alt: 'DeepSeek' },
  { src: zhipuLogo, alt: 'Zhipu AI' },
];

const escapeHtml = (content = '') =>
  content
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const [userState, userDispatch] = useContext(UserContext);
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const navigate = useNavigate();
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [typedCodeLines, setTypedCodeLines] = useState([]);
  const isMobile = useIsMobile();

  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const showDefaultHome = homePageContentLoaded && homePageContent === '';
  const docsLangPrefix = i18n.language.startsWith('zh') ? 'zh' : 'en';

  const docsHref =
    docsLink || `https://allrouter.ai/${docsLangPrefix}/docs`;
  const apiReferenceHref = `https://allrouter.ai/${docsLangPrefix}/docs/api`;
  const communityHref = `https://allrouter.ai/${docsLangPrefix}/docs/support/community-interaction`;
  const currentUser = userState?.user || getStoredUser();
  const isLoggedIn = Boolean(currentUser?.id);
  const isSelfUseMode = statusState?.status?.self_use_mode_enabled || false;
  const headerNavModules = useMemo(() => {
    const headerNavModulesConfig = statusState?.status?.HeaderNavModules;
    if (!headerNavModulesConfig) {
      return null;
    }
    try {
      const modules = JSON.parse(headerNavModulesConfig);
      if (typeof modules.pricing === 'boolean') {
        modules.pricing = {
          enabled: modules.pricing,
          requireAuth: false,
        };
      }
      return modules;
    } catch {
      return null;
    }
  }, [statusState?.status?.HeaderNavModules]);
  const pricingRequireAuth = useMemo(() => {
    if (headerNavModules?.pricing) {
      return typeof headerNavModules.pricing === 'object'
        ? headerNavModules.pricing.requireAuth
        : false;
    }
    return false;
  }, [headerNavModules]);
  const consoleNavTarget = isLoggedIn ? '/console' : '/login';
  const pricingNavTarget =
    !isLoggedIn && pricingRequireAuth ? '/login' : '/pricing';
  const normalizedUserState = { user: currentUser };

  const handleThemeToggle = useCallback(
    (newTheme) => {
      if (
        newTheme === 'light' ||
        newTheme === 'dark' ||
        newTheme === 'auto'
      ) {
        setTheme(newTheme);
      }
    },
    [setTheme],
  );

  const handleLanguageChange = useCallback(
    async (lang) => {
      i18n.changeLanguage(lang);
      if (!currentUser?.id) {
        return;
      }
      try {
        const res = await API.put('/api/user/self', { language: lang });
        if (res.data.success && currentUser?.setting) {
          const settings = JSON.parse(currentUser.setting);
          settings.language = lang;
          userDispatch({
            type: 'login',
            payload: {
              ...currentUser,
              setting: JSON.stringify(settings),
            },
          });
        }
      } catch (error) {
        console.error('Failed to save language preference:', error);
      }
    },
    [currentUser, i18n, userDispatch],
  );

  const handleNoticeOpen = useCallback(() => {
    setNoticeVisible(true);
  }, []);

  const logout = useCallback(async () => {
    await API.get('/api/user/logout');
    userDispatch({ type: 'logout' });
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate, userDispatch]);

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent(t('加载首页内容失败...'));
    }
    setHomePageContentLoaded(true);
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    if (!showDefaultHome) {
      return undefined;
    }

    const codeBaseUrl = `${serverAddress.replace(/\/$/, '')}/v1`;
    const codeLines = [
      {
        html: `<span class='landing-v2-c-c'># ${escapeHtml(t('安装官方 SDK'))}</span>`,
        delay: 420,
      },
      {
        html: "<span class='landing-v2-c-k'>pip</span> install openai",
        delay: 720,
      },
      {
        html: '',
        delay: 160,
      },
      {
        html: "<span class='landing-v2-c-k'>import</span> openai",
        delay: 620,
      },
      {
        html: '',
        delay: 140,
      },
      {
        html: `<span class='landing-v2-c-c'># ${escapeHtml(t('只需替换 base_url 与 api_key'))}</span>`,
        delay: 640,
      },
      {
        html: 'client = openai.OpenAI(',
        delay: 360,
      },
      {
        html: `    base_url=<span class='landing-v2-c-s'>'${escapeHtml(codeBaseUrl)}'</span>,`,
        delay: 360,
      },
      {
        html: "    api_key=<span class='landing-v2-c-s'>'sk-...'</span>",
        delay: 360,
      },
      {
        html: ')',
        delay: 420,
      },
      {
        html: '',
        delay: 160,
      },
      {
        html: `<span class='landing-v2-c-c'># ${escapeHtml(
          t('任意模型即开即用：gpt-4、claude-3、llama-3...'),
        )}</span>`,
        delay: 620,
      },
      {
        html: 'response = client.chat.completions.create(',
        delay: 360,
      },
      {
        html: "    model=<span class='landing-v2-c-s'>'claude-3-opus'</span>,",
        delay: 360,
      },
      {
        html: "    messages=[{<span class='landing-v2-c-s'>'role'</span>: <span class='landing-v2-c-s'>'user'</span>, <span class='landing-v2-c-s'>'content'</span>: <span class='landing-v2-c-s'>'Hello!'</span>}]",
        delay: 360,
      },
      {
        html: ')',
        delay: 260,
      },
      {
        html: "<span class='landing-v2-cursor'></span>",
        delay: 0,
      },
    ];

    let timeoutId;
    let lineIndex = 0;
    let cancelled = false;

    setTypedCodeLines([]);

    const printLine = () => {
      if (cancelled || lineIndex >= codeLines.length) {
        return;
      }

      const line = codeLines[lineIndex];
      setTypedCodeLines((prev) => [...prev, line.html]);
      lineIndex += 1;
      timeoutId = window.setTimeout(printLine, line.delay);
    };

    timeoutId = window.setTimeout(printLine, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [showDefaultHome, serverAddress, i18n.language, t]);

  return (
    <div
      className={
        showDefaultHome
          ? `landing-home landing-v2 ${!isLoggedIn ? 'landing-v2-guest-home' : ''}`
          : 'w-full overflow-x-hidden'
      }
    >
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {showDefaultHome ? (
        <>
          <nav
            className={`landing-v2-nav ${!isLoggedIn ? 'landing-v2-nav-fixed' : ''}`}
          >
            <div className='landing-v2-logo'>
              <img src={Logo} alt='AllRouter.AI Logo' className='landing-v2-real-logo' />
              <span>AllRouter.AI</span>
            </div>

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
                  unreadCount={0}
                  onNoticeOpen={handleNoticeOpen}
                  t={t}
                />
                <ThemeToggle
                  theme={theme}
                  onThemeToggle={handleThemeToggle}
                  t={t}
                />
                <LanguageSelector
                  currentLang={i18n.language}
                  onLanguageChange={handleLanguageChange}
                  t={t}
                />
              </div>
              {isLoggedIn ? (
                <UserArea
                  userState={normalizedUserState}
                  isLoading={false}
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
                  <Link to='/console' className='landing-v2-btn-primary'>
                    {t('获取密钥')}
                  </Link>
                </>
              )}
            </div>
          </nav>

          <main className='landing-v2-main'>
            <section className='landing-v2-hero'>
              <div className='landing-v2-hero-content'>
                <h1>
                  {t('一套 API，')}
                  <br />
                  <span>{t('畅连所有 AI。')}</span>
                </h1>
                <p>
                  {t(
                    '统一的大模型网关。可在 OpenAI、Claude、Llama 及 50+ 模型间即时切换，并通过智能路由最高节省 50% 成本。',
                  )}
                </p>
                <div className='landing-v2-hero-buttons'>
                  <Link
                    to='/console'
                    target='_blank'
                    className='landing-v2-btn-primary landing-v2-btn-lg'
                  >
                    {t('免费开始构建')}
                  </Link>
                  <a
                    href={docsHref}
                    target='_blank'
                    rel='noreferrer'
                    className='landing-v2-btn-secondary landing-v2-btn-lg'
                  >
                    {t('阅读文档')}
                  </a>
                </div>
              </div>

              <div className='landing-v2-code-window'>
                <div className='landing-v2-window-header'>
                  <span className='landing-v2-dot landing-v2-dot-red' />
                  <span className='landing-v2-dot landing-v2-dot-yellow' />
                  <span className='landing-v2-dot landing-v2-dot-green' />
                </div>
                <div className='landing-v2-code-content'>
                  {typedCodeLines.map((line, index) => (
                    <div
                      key={`landing-v2-line-${index}`}
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section id='models' className='landing-v2-logo-section'>
              <p>{t('支持 50+ 模型与供应商')}</p>
              <div className='landing-v2-logo-grid'>
                {partnerLogos.map((logo) => (
                  <div key={logo.alt} className='landing-v2-logo-item'>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className='landing-v2-partner-logo'
                    />
                  </div>
                ))}
              </div>
            </section>

            <section id='features' className='landing-v2-features'>
              <div className='landing-v2-section-header'>
                <h2>{t('一站式能力，助你规模化落地')}</h2>
                <p>{t('为追求稳定、速度与成本效率的开发者而构建。')}</p>
              </div>

              <div className='landing-v2-feature-grid'>
                <article className='landing-v2-card'>
                  <div className='landing-v2-card-icon'>
                    <i className='fas fa-bolt' />
                  </div>
                  <h3>{t('无缝替换')}</h3>
                  <p>
                    {t(
                      '100% 兼容 OpenAI SDK。只需修改一行代码（base_url），即可接入全量 AI 能力。',
                    )}
                  </p>
                </article>

                <article className='landing-v2-card'>
                  <div className='landing-v2-card-icon'>
                    <i className='fas fa-chart-line' />
                  </div>
                  <h3>{t('智能成本路由')}</h3>
                  <p>
                    {t(
                      '可按你的规则自动将请求路由到当前成本更低或响应更快的模型。',
                    )}
                  </p>
                </article>

                <article className='landing-v2-card'>
                  <div className='landing-v2-card-icon'>
                    <i className='fas fa-shield-halved' />
                  </div>
                  <h3>{t('高可用保障')}</h3>
                  <p>{t('当某个供应商异常时自动故障切换，无需停机。')}</p>
                </article>

                <article className='landing-v2-card'>
                  <div className='landing-v2-card-icon'>
                    <i className='fas fa-eye' />
                  </div>
                  <h3>{t('实时可观测')}</h3>
                  <p>{t('在控制台和日志中实时追踪延迟、Token 用量与成本。')}</p>
                </article>
              </div>
            </section>

            <section className='landing-v2-cta-section'>
              <div className='landing-v2-cta-box'>
                <h2>{t('准备好优化你的 AI 技术栈了吗？')}</h2>
                <p>{t('加入成千上万开发者，以更低成本和更高速度构建 AI 应用。')}</p>
                <Link target='_blank' to='/console' className='landing-v2-btn-primary landing-v2-btn-lg'>
                  {t('获取免费 API 密钥')}
                </Link>
              </div>
            </section>
          </main>

          <footer className='landing-v2-footer'>
            <div className='landing-v2-footer-brand'>
              <div className='landing-v2-logo landing-v2-logo-small'>
                <img
                  src={Logo}
                  alt='AllRouter.AI Logo'
                  className='landing-v2-real-logo'
                />
                <span>AllRouter.AI</span>
              </div>
              <p>{t('面向大语言模型的统一网关，为下一代 AI 应用而构建。')}</p>
            </div>

            <div className='landing-v2-footer-col'>
              <h4>{t('产品')}</h4>
              <ul>
                <li>
                  <a href='#features'>{t('功能')}</a>
                </li>
                <li>
                  <a href='#models'>{t('集成')}</a>
                </li>
                <li>
                  <Link to='/pricing'>{t('定价')}</Link>
                </li>
                <li>
                  <a
                    href='https://github.com/shengjian-tech/allrouter/releases'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('更新日志')}
                  </a>
                </li>
              </ul>
            </div>

            <div className='landing-v2-footer-col'>
              <h4>{t('资源')}</h4>
              <ul>
                <li>
                  <a href={docsHref} target='_blank' rel='noreferrer'>
                    {t('文档')}
                  </a>
                </li>
                <li>
                  <a
                    href={apiReferenceHref}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('API 参考')}
                  </a>
                </li>
                <li>
                  <a
                    href={communityHref}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('社区')}
                  </a>
                </li>
                <li>
                  <a
                    href='https://status.allrouter.ai/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('系统状态')}
                  </a>
                </li>
              </ul>
            </div>

            <div className='landing-v2-footer-col'>
              <h4>{t('公司')}</h4>
              <ul>
                <li>
                  <Link to='/about'>{t('关于平台')}</Link>
                </li>
                <li>
                  <a
                    href='https://github.com/shengjian-tech/allrouter'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('博客')}
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/shengjian-tech/allrouter/issues'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('招贤纳士')}
                  </a>
                </li>
                <li>
                  <a target='_blank' href='https://allrouter.ai/en/index'>{t('联系我们')}</a>
                </li>
              </ul>
            </div>
          </footer>
        </>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
