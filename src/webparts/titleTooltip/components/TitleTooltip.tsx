import * as React from "react";
import styles from "./TitleTooltip.module.scss";
import type { ITitleTooltipProps } from "./ITitleTooltipProps";
import { escape } from "@microsoft/sp-lodash-subset";

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
        <div className="">
          <strong> {escape(title)}</strong>
          <span>{escape(tooltip_text)} </span>
        </div>
      </section>
    );
  }
}
