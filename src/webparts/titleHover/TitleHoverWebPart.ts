import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
 import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TitleHoverWebPart.module.scss';
import * as strings from 'TitleHoverWebPartStrings';

export interface ITitleHoverWebPartProps {
  title: string;
  title_font_size: string;
  hover_text: string,
  hover_text_font_size: string;
}

export default class TitleHoverWebPart extends BaseClientSideWebPart<ITitleHoverWebPartProps> {



  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.titleHover}">

    <strong> ${ escape(this.properties.title )} </strong>

        <strong>  </strong>
    <p> ${escape(this.properties.hover_text)} </p>
    </div>
    `;
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
  
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

  
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'title'
                }),
                PropertyPaneTextField('title_font_size', {
                  label: 'title font size'
                }),
                PropertyPaneTextField('hover_text', {
                  label: 'hover text'
                }),
                PropertyPaneTextField('hover_text_font_size', {
                  label: 'hover text fonty size'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
