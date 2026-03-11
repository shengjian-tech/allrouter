import React, { useMemo } from 'react';
import { Layout, Anchor } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '../../i18n/language';
import docsZhCNMd from './docs_content.md?raw';
import docsZhTWMd from './docs_content.zh-TW.md?raw';
import docsEnMd from './docs_content.en.md?raw';
import docsFrMd from './docs_content.fr.md?raw';
import docsJaMd from './docs_content.ja.md?raw';
import docsRuMd from './docs_content.ru.md?raw';
import docsViMd from './docs_content.vi.md?raw';
import { marked } from 'marked';

const { Sider, Content } = Layout;

const DOCS_UPDATED_AT = '2026-03-10';

const DOCS_CONTENT_MAP = {
  'zh-CN': docsZhCNMd,
  'zh-TW': docsZhTWMd,
  en: docsEnMd,
  fr: docsFrMd,
  ru: docsRuMd,
  ja: docsJaMd,
  vi: docsViMd,
};

const DOCS_META_MAP = {
  'zh-CN': {
    title: 'AllRouter 使用指南',
    updatedAtPrefix: '更新时间：',
    tocTitle: '本文内容',
  },
  'zh-TW': {
    title: 'AllRouter 使用指南',
    updatedAtPrefix: '更新時間：',
    tocTitle: '本文內容',
  },
  en: {
    title: 'AllRouter Usage Guide',
    updatedAtPrefix: 'Last updated: ',
    tocTitle: 'On this page',
  },
  fr: {
    title: "Guide d'utilisation AllRouter",
    updatedAtPrefix: 'Dernière mise à jour : ',
    tocTitle: 'Sur cette page',
  },
  ja: {
    title: 'AllRouter 製品ユーザーガイド',
    updatedAtPrefix: '更新日：',
    tocTitle: 'このページの内容',
  },
  ru: {
    title: 'Руководство пользователя AllRouter',
    updatedAtPrefix: 'Обновлено: ',
    tocTitle: 'Содержание',
  },
  vi: {
    title: 'Hướng dẫn người dùng AllRouter',
    updatedAtPrefix: 'Cập nhật: ',
    tocTitle: 'Nội dung trang',
  },
  default: {
    title: 'AllRouter Product User Guide',
    updatedAtPrefix: 'Last updated: ',
    tocTitle: 'On this page',
  },
};

const generateAnchorId = (rawText, anchorCountMap) => {
  const normalizedText = rawText
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\u4e00-\u9fa5]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  const baseAnchor = normalizedText || 'section';
  const count = anchorCountMap.get(baseAnchor) || 0;

  anchorCountMap.set(baseAnchor, count + 1);
  if (count === 0) {
    return baseAnchor;
  }

  return `${baseAnchor}-${count + 1}`;
};

const Docs = () => {
  const { i18n } = useTranslation();

  const language = normalizeLanguage(
    i18n.resolvedLanguage || i18n.language || 'zh-CN',
  );

  const docsMarkdown = DOCS_CONTENT_MAP[language] || DOCS_CONTENT_MAP.en;
  const docsMeta = DOCS_META_MAP[language] || DOCS_META_MAP.default;

  const { htmlContent, toc } = useMemo(() => {
    const renderer = new marked.Renderer();
    const headings = [];
    const anchorCountMap = new Map();

    // This function intercepts markdown heading parsings.
    renderer.heading = function (text, level, raw) {
      const anchor = generateAnchorId(raw || text, anchorCountMap);
      headings.push({ id: anchor, level, text });
      return `<h${level} id="${anchor}">${text}</h${level}>\n`;
    };

    const html = marked.parse(docsMarkdown, { renderer });

    return {
      htmlContent: html,
      toc: headings,
    };
  }, [docsMarkdown]);

  return (
    <Layout className='mt-[60px] pb-[60px] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8' style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
      {/* Left side: Main Documentation Content */}
      <Content className='flex-1 min-w-0'>
        <div
          style={{
            padding: '40px 48px',
            fontSize: '16px',
            lineHeight: '1.8',
            color: 'var(--semi-color-text-0)',
            backgroundColor: 'var(--semi-color-bg-0)',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          }}
        >
          <style>{`
            .docs-content h1 {
              font-size: 2.2em;
              font-weight: 700;
              margin: 1.5em 0 0.8em;
              padding-bottom: 0.3em;
              border-bottom: 1px solid var(--semi-color-border);
              color: var(--semi-color-text-0);
              scroll-margin-top: 80px;
            }
            .docs-content h2 {
              font-size: 1.8em;
              font-weight: 600;
              margin: 1.5em 0 0.6em;
              color: var(--semi-color-text-0);
              scroll-margin-top: 80px;
            }
            .docs-content h3 {
              font-size: 1.4em;
              font-weight: 600;
              margin: 1.2em 0 0.5em;
              color: var(--semi-color-text-0);
              scroll-margin-top: 80px;
            }
            .docs-content h4 {
              font-size: 1.1em;
              font-weight: 600;
              margin: 1em 0 0.4em;
              color: var(--semi-color-text-1);
              scroll-margin-top: 80px;
            }
            .docs-content p {
              margin: 0.8em 0;
              color: var(--semi-color-text-1);
            }
            .docs-content img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 24px auto;
              box-shadow: 0 4px 16px rgba(0,0,0,0.08);
              display: block;
            }
            .docs-content a {
              color: var(--semi-color-primary);
              text-decoration: none;
              font-weight: 500;
              transition: color 0.2s;
            }
            .docs-content a:hover {
              color: var(--semi-color-primary-hover);
              text-decoration: underline;
            }
            .docs-content ul, .docs-content ol {
              padding-left: 24px;
              margin: 1em 0;
              color: var(--semi-color-text-1);
            }
            .docs-content li {
              margin-bottom: 0.5em;
            }
            .docs-content table {
              border-collapse: collapse;
              width: 100%;
              margin: 2em 0;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 0 0 1px var(--semi-color-border);
            }
            .docs-content table td,
            .docs-content table th {
              border-bottom: 1px solid var(--semi-color-border);
              padding: 12px 16px;
              text-align: left;
            }
            .docs-content table th {
              background-color: var(--semi-color-fill-0);
              font-weight: 600;
              color: var(--semi-color-text-0);
            }
            .docs-content code {
              background: var(--semi-color-fill-0);
              padding: 3px 6px;
              border-radius: 4px;
              font-size: 0.9em;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
              color: #eb5757;
            }
            .docs-content pre {
              background: #1e1e1e;
              padding: 20px;
              border-radius: 12px;
              overflow-x: auto;
              margin: 1.5em 0;
              box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
            }
            .docs-content pre code {
              background: transparent;
              padding: 0;
              border-radius: 0;
              font-size: 0.9em;
              color: #d4d4d4;
            }
            .docs-content blockquote {
              border-left: 4px solid var(--semi-color-primary);
              margin: 1.5em 0;
              padding: 0.8em 1em;
              background: var(--semi-color-primary-light-default);
              border-radius: 4px 8px 8px 4px;
              color: var(--semi-color-text-1);
            }
          `}</style>
          {/* The introductory block before the first h1 */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5em', fontWeight: '800', marginBottom: '16px' }}>{docsMeta.title}</h1>
            <p style={{ color: 'var(--semi-color-text-2)' }}>
              {docsMeta.updatedAtPrefix}
              {DOCS_UPDATED_AT}
            </p>
          </div>

          <div
            className='docs-content'
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </Content>

      {/* Right side: Table of Contents / Anchor navigation */}
      <Sider
        style={{ width: 260, backgroundColor: 'transparent' }}
        className='hidden md:block shrink-0'
      >
        <style>{`
          .docs-toc-container {
            position: sticky;
            top: 80px;
            max-height: calc(100vh - 100px);
            overflow-y: auto;
            padding-right: 12px;
            /* Scrollbar styling */
            scrollbar-width: thin;
            scrollbar-color: var(--semi-color-border) transparent;
          }
          .docs-toc-container::-webkit-scrollbar {
            width: 4px;
          }
          .docs-toc-container::-webkit-scrollbar-thumb {
            background: var(--semi-color-border);
            border-radius: 4px;
          }
          
          /* Feishu style Anchor overrides */
          .docs-toc-anchor .semi-anchor-line {
            display: none !important; /* Hide the default gray track line */
          }
          .docs-toc-anchor .semi-anchor-slider {
            background-color: #3370ff !important; /* Feishu Blue */
            width: 2px !important;
            border-radius: 2px;
            left: 0 !important;
            z-index: 2;
          }
          .docs-toc-anchor .semi-anchor-link {
            padding: 6px 0 6px 0;
            position: relative;
          }
          .docs-toc-anchor .semi-anchor-link-title {
            width: 100%;
          }
          
          /* Feishu style items */
          .docs-toc-item {
            color: #646a73 !important; /* Feishu gray */
            transition: color 0.1s;
            position: relative;
            padding-left: 12px;
          }
          .docs-toc-item:hover {
            color: #1f2329 !important; /* Feishu dark gray on hover */
          }
          
          /* When this particular link is active */
          .semi-anchor-link-active .docs-toc-item {
            color: #3370ff !important; /* Feishu Blue */
            font-weight: 500 !important;
          }
        `}</style>
        <div className="docs-toc-container">
          <div style={{ paddingLeft: '12px', marginBottom: '12px', fontWeight: '500', fontSize: '14px', color: '#1f2329' }}>
            {docsMeta.tocTitle}
          </div>
          {toc.length > 0 && (
            <div style={{ position: 'relative' }}>
              {/* Fake left border for the whole anchor area */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: 'var(--semi-color-border)',
                zIndex: 0
              }}></div>

              <Anchor
                showTooltip
                targetOffset={80} // Offset for the fixed header
                style={{ backgroundColor: 'transparent' }}
                className="docs-toc-anchor"
              >
                {toc.map((item) => {
                  // Feishu style exact indentations
                  let paddingLeft = 12; // Base padding from the line
                  if (item.level === 2) paddingLeft = 24;
                  if (item.level === 3) paddingLeft = 36;
                  if (item.level >= 4) paddingLeft = 48;

                  return (
                    <Anchor.Link
                      key={item.id}
                      href={`#${item.id}`}
                      title={
                        <div className="docs-toc-item" style={{
                          paddingLeft: `${paddingLeft}px`,
                          fontSize: '13px',
                          fontWeight: '400',
                          lineHeight: '18px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'block',
                          maxWidth: '220px'
                        }}>
                          {item.text}
                        </div>
                      }
                    />
                  );
                })}
              </Anchor>
            </div>
          )}
        </div>
      </Sider>
    </Layout>
  );
};

export default Docs;
