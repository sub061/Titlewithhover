import * as React from "react";
import styles from "./TitleTooltip.module.scss";
import type { ITitleTooltipProps } from "./ITitleTooltipProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default class TitleTooltip extends React.Component<
  ITitleTooltipProps,
  {}
> {
  public render(): React.ReactElement<ITitleTooltipProps> {
    const {
      // description,
      // isDarkTheme,
      // environmentMessage,
      hasTeamsContext,
      //userDisplayName,
      title,
      //title_font_size,
      tooltip_text,
      // tooltip_text_font_size,
      //tooltip_align,
    } = this.props;

    return (
      <section
        className={`${styles.titleTooltip} ${
          hasTeamsContext ? styles.teams : ""
        }`}
      >
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content={escape(tooltip_text)}
        >
          <strong> {escape(title)}</strong>
        </a>
        <Tooltip id="my-tooltip" />
      </section>
    );
  }
}
