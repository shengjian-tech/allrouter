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

import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Typography,
  Input,
  ScrollList,
  ScrollItem,
} from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
  IconChevronRight,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import { OpenAI, Claude, Gemini, DeepSeek, Qwen, Grok } from '@lobehub/icons';

const { Text } = Typography;

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);
  const particlesCanvasRef = useRef(null);
  const showDefaultHome = homePageContentLoaded && homePageContent === '';

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

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
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
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  useEffect(() => {
    if (!showDefaultHome) {
      return undefined;
    }

    const canvas = particlesCanvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let animationFrameId;
    let isAnimationActive = true;
    let width = 0;
    let height = 0;
    let particles = [];

    const buildParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.8 + 0.8,
    });

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 38 : 78;
      particles = Array.from({ length: count }, buildParticle);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const animate = () => {
      if (!isAnimationActive) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        ctx.fillStyle = 'rgba(0, 243, 255, 0.45)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j += 1) {
          const otherParticle = particles[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = Math.max(0, 0.12 - dist / 1500);
            ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });

      if (isAnimationActive) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      isAnimationActive = false;
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      particles = [];
      window.removeEventListener('resize', resize);
    };
  }, [showDefaultHome]);

  return (
    <div className={showDefaultHome ? 'landing-home' : 'w-full overflow-x-hidden'}>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {showDefaultHome ? (
        <>
          <div className='landing-bg-animation' aria-hidden='true'>
            <div className='landing-orb landing-orb-primary' />
            <div className='landing-orb landing-orb-secondary' />
            <canvas
              ref={particlesCanvasRef}
              className='landing-particles-canvas'
            />
          </div>

          <nav className='landing-nav'>
            <div className='landing-logo'>allrouter.ai</div>
            <div className='landing-nav-actions'>
              <Link to='/console' className='landing-nav-btn'>
                {t('获取密钥')}
              </Link>
              {docsLink && (
                <a
                  href={docsLink}
                  target='_blank'
                  rel='noreferrer'
                  className='landing-nav-btn'
                >
                  {t('文档')}
                </a>
              )}
            </div>
          </nav>

          <main className='landing-main'>
            <section className='landing-hero'>
              <h1>
                {t('智能路由,')}
                <br />
                <span>{t('由 AI 驱动')}</span>
              </h1>
              <p>
                {t(
                  '将您的网络从简单连接升级为智能、自优化的生态系统。立即体验连接的未来。',
                )}
              </p>

              <div className='landing-endpoint-wrap'>
                <Input
                  readonly
                  value={serverAddress}
                  className='landing-endpoint-input'
                  size={isMobile ? 'default' : 'large'}
                  suffix={
                    <div className='landing-endpoint-suffix'>
                      <ScrollList
                        bodyHeight={32}
                        style={{ border: 'unset', boxShadow: 'unset' }}
                      >
                        <ScrollItem
                          mode='wheel'
                          cycled={true}
                          list={endpointItems}
                          selectedIndex={endpointIndex}
                          onSelect={({ index }) => setEndpointIndex(index)}
                        />
                      </ScrollList>
                      <Button
                        type='primary'
                        onClick={handleCopyBaseURL}
                        icon={<IconCopy />}
                        className='landing-copy-btn'
                      />
                    </div>
                  }
                />
              </div>

              <div className='landing-cta-group'>
                <Link to='/console'>
                  <Button
                    theme='solid'
                    type='primary'
                    size={isMobile ? 'default' : 'large'}
                    className='landing-btn-primary'
                    icon={<IconPlay />}
                  >
                    {t('获取密钥')}
                  </Button>
                </Link>
                {isDemoSiteMode && statusState?.status?.version ? (
                  <Button
                    size={isMobile ? 'default' : 'large'}
                    className='landing-btn-secondary'
                    icon={<IconGithubLogo />}
                    onClick={() =>
                      window.open('https://github.com/QuantumNous/new-api', '_blank')
                    }
                  >
                    {statusState.status.version}
                  </Button>
                ) : (
                  docsLink && (
                    <Button
                      size={isMobile ? 'default' : 'large'}
                      className='landing-btn-secondary'
                      icon={<IconFile />}
                      onClick={() => window.open(docsLink, '_blank')}
                    >
                      {t('文档')}
                    </Button>
                  )
                )}
              </div>
            </section>

            <section id='features' className='landing-features'>
              <h2 className='landing-section-title'>
                {t('为什么选择 AllRouter？')}
              </h2>
              <div className='landing-feature-grid'>
                <article className='landing-feature-card'>
                  <div className='icon-box'>
                    <i className='fas fa-brain' />
                  </div>
                  <h3>{t('AI 优化')}</h3>
                  <p>
                    {t('我们的机器学习算法实时分析流量模式，自动降低延迟并提升速度。')}
                  </p>
                </article>
                <article className='landing-feature-card'>
                  <div className='icon-box'>
                    <i className='fas fa-shield-halved' />
                  </div>
                  <h3>{t('智能安全')}</h3>
                  <p>
                    {t(
                      '先进的威胁检测可在恶意流量到达设备前进行拦截，全天候守护您的数据安全。',
                    )}
                  </p>
                </article>
                <article className='landing-feature-card'>
                  <div className='icon-box'>
                    <i className='fas fa-network-wired' />
                  </div>
                  <h3>{t('通用兼容')}</h3>
                  <p>
                    {t(
                      '兼容所有主流路由器品牌，可在一个直观的控制台中管理整个家庭或办公网络。',
                    )}
                  </p>
                </article>
              </div>

              <div className='landing-provider-row'>
                <Text type='tertiary' className='landing-provider-title'>
                  {t('支持众多的大模型供应商')}
                </Text>
                <div className='landing-provider-list'>
                  <div className='landing-provider-item'>
                    <OpenAI size={28} />
                  </div>
                  <div className='landing-provider-item'>
                    <Claude.Color size={28} />
                  </div>
                  <div className='landing-provider-item'>
                    <Gemini.Color size={28} />
                  </div>
                  <div className='landing-provider-item'>
                    <DeepSeek.Color size={28} />
                  </div>
                  <div className='landing-provider-item'>
                    <Qwen.Color size={28} />
                  </div>
                  <div className='landing-provider-item'>
                    <Grok size={28} />
                  </div>
                  <div className='landing-provider-item landing-provider-more'>
                    40+
                  </div>
                </div>
              </div>
            </section>

            <section className='landing-related-section'>
              <div className='landing-related-container'>
                <div className='landing-related-header'>
                  <h2>{t('探索更多')}</h2>
                  <p>{t('快速访问定价、文档与控制台入口。')}</p>
                </div>

                <div className='landing-search-list'>
                  <Link to='/pricing' className='landing-search-item'>
                    <span className='landing-search-text'>{t('模型定价与对比')}</span>
                    <IconChevronRight className='landing-search-arrow' />
                  </Link>
                  <Link to='/about' className='landing-search-item'>
                    <span className='landing-search-text'>{t('关于平台')}</span>
                    <IconChevronRight className='landing-search-arrow' />
                  </Link>
                  <Link to='/console' className='landing-search-item'>
                    <span className='landing-search-text'>{t('进入控制台')}</span>
                    <IconChevronRight className='landing-search-arrow' />
                  </Link>
                  {docsLink && (
                    <a
                      href={docsLink}
                      target='_blank'
                      rel='noreferrer'
                      className='landing-search-item'
                    >
                      <span className='landing-search-text'>{t('官方文档')}</span>
                      <IconChevronRight className='landing-search-arrow' />
                    </a>
                  )}
                 
                </div>
              </div>
            </section>
          </main>

          <footer className='landing-footer'>
            <p>
              &copy; {new Date().getFullYear()} allrouter.ai. {t('版权所有')}
            </p>
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
