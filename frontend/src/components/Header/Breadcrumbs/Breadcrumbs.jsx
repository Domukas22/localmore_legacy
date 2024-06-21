//
//

import css from "./Breadcrumbs.module.css";

import { Breadcrumbs as ReactAriaBreadcrumbs, Breadcrumb, Link } from "react-aria-components";

export function Breadcrumbs({ texts_ARR = [], urls_ARR = [] }) {
  const [text_1, text_2, text_3, text_4] = texts_ARR;
  const [url_1, url_2, url_3] = urls_ARR;

  return (
    <nav>
      <ReactAriaBreadcrumbs className={css.Breadcrumbs}>
        {text_1 && (
          <Breadcrumb>
            <Link href={`${url_1 ? url_1 : ""}`} className={css.breadcrumb_LINK}>
              {text_1}
            </Link>
          </Breadcrumb>
        )}
        {text_2 && (
          <Breadcrumb>
            <Link
              href={`${url_2 ? url_2 : ""}`}
              className={css.breadcrumb_LINK}
              data-active={texts_ARR.length === 2}
            >
              {text_2}
            </Link>
          </Breadcrumb>
        )}
        {text_3 && (
          <Breadcrumb>
            <Link
              href={`${url_3 ? url_3 : ""}`}
              className={css.breadcrumb_LINK}
              data-active={texts_ARR.length === 3}
            >
              {text_3}
            </Link>
          </Breadcrumb>
        )}
        {text_4 && (
          <Breadcrumb>
            <Link className={css.breadcrumb_LINK} data-active={texts_ARR.length === 4}>
              {text_4}
            </Link>
          </Breadcrumb>
        )}
      </ReactAriaBreadcrumbs>
    </nav>
  );
}
