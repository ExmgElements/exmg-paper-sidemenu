import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@exmg/exmg-paper-tooltip/exmg-paper-tooltip.js';
import '@polymer/iron-icon/iron-icon.js';
import './exmg-paper-sidemenu-icons.js';

/**
* `exmg-paper-sidemenu-header` default sidemenu header including a home and settings link.
*
* ### Menu data model
* Menu items need to have the following structure:
* ```html
* <exmg-paper-sidemenu menu="[[menu]]" selected="[[selected]]" collapsed="{{collapsed}}">
*   <exmg-paper-sidemenu-header
*     slot="header"
*     collapsed="[[collapsed]]">
*   </exmg-paper-sidemenu-header>
* </exmg-paper-sidemenu>
* ```
*
* Please note not to forget to bind the collpapsed attribute. Otherwise the header will
* not change layout mode when menu is collapsing.
*
* ### Styling
*
* `<exmg-paper-sidemenu-header>` provides the following custom properties and mixins
* for styling:
*
* Custom property | Description | Default
* ----------------|-------------|----------
* `--exmg-paper-sidemenu-group-text-color` | Item text color | `54% black`
* `--exmg-paper-sidemenu-header-item` | Header item mixin | `{}`
* `--exmg-paper-sidemenu-menu-header-background-color` | Header background color | `#F9FAF9`
* `--exmg-paper-sidemenu-header-menu` | Menu header mixin | `{}`
* `--exmg-paper-sidemenu-hover-background-color` | Item hiover background color | `--paper-grey-200`
* `--exmg-paper-sidemenu-selected-text-color` | Selected item text color | `--primary-color`
*
* @customElement
* @polymer
*  @memberof Exmg
* @group Exmg Paper Elements
* @element exmg-paper-sidemenu-header
*/
export class CmsSidemenuHeader extends PolymerElement {
  debug!: boolean;

  static get is(): string {
    return 'exmg-paper-sidemenu-header';
  }
  static get properties() {
    return {
      /*
      * Disables actual href links
      */
      debug: {
        type: Boolean,
        value: false,
      },
      /*
      * For selection you can use the path value
      */
      selected: {
        notify: true,
        type: String,
      },
      /*
      * Label for link to home/dashboard. Default is 'Dashboard'
      */
      homeLabel: {
        type: String,
        value: 'Dashboard',
      },
      /*
      * Home icon. Default will use the dashboard icon from the
      * exmg-paper-sidemenu-icons set.
      */
      homeIcon: {
        type: String,
        value: 'exmg-paper-sidemenu-icons:dashboard',
      },
      /*
      * Url to home/landings page
      */
      homeUrl: {
        type: String,
        value: '/',
      },
      /*
      * Label for link to settings page. Default is 'Settings'
      */
      settingsLabel: {
        type: String,
        value: 'Settings',
      },
      /*
      * Url to settings section
      */
      settingsUrl: {
        type: String,
        value: 'settings/',
      },
      /*
      * Settings icon. Default will use the settins icon from the
      * exmg-paper-sidemenu-icons set.
      */
      settingsIcon: {
        type: String,
        value: 'exmg-paper-sidemenu-icons:settings',
      },

      /*
      * Property that determines the element display style collapsed of expanded
      */
      collapsed: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false,
      },
    };
  }
  static get template(): HTMLTemplateElement {
    return html`
    <style>
      :host {
        display: block;
      }

      paper-listbox {
        padding: 0;
      }

      paper-item {
        height: 56px;
        box-sizing: border-box;
        line-height: 56px;
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
        color: var(--exmg-paper-sidemenu-group-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
        cursor: pointer;
        @apply --exmg-paper-sidemenu-header-item;
      }

      paper-item:last-child {
        padding: 0 8px;
      }

      paper-item iron-icon {
        padding-right: 12px;
        width: 24px;
        max-width: 24px;
        height: 20px;
        @apply --exmg-paper-sidemenu-header-item-icon;
      }

      exmg-paper-tooltip {
        display: none;
        white-space: nowrap;
      }

      .menu-header {
        @apply --layout;
        @apply --layout-center;
        box-sizing: border-box;
        background: var(--exmg-paper-sidemenu-menu-header-background-color, #F9FAF9);
        min-height: 56px;
        border-bottom: 1px solid #ddd;
        @apply --exmg-paper-sidemenu-header-menu;
      }

      .menu-header paper-listbox {
        @apply --layout;
        width: 100%;
        border: none;
        background: none;
      }

      .menu-header .menu-item:first-child {
        border-right: 1px solid var(--divider-color);
        @apply --layout-flex;
        @apply --exmg-paper-sidemenu-header-dashboard;
      }

      .menu-header .menu-item:nth-child(2) iron-icon {
        padding-right: 0;
      }

      :host([collapsed]) .menu-header {
        padding: 10px 0 8px;
        @apply --layout-vertical;
      }

      :host([collapsed]) exmg-paper-tooltip {
        display: block;
      }

      :host([collapsed]) .menu-header .menu-item:nth-child(1) iron-icon {
        padding-right: 0;
      }

      :host([collapsed]) .menu-header paper-listbox {
        @apply --layout-vertical;
        border-right: none;
        border-bottom: none;
        padding: 5px 0;
      }

      :host([collapsed]) paper-item {
        min-height: 36px;
        line-height: 36px;
        height: initial;
        border-right: none;
      }

      :host([collapsed]) paper-item .title {
        opacity: 0;
        width: 0;
        pointer-events: none;
      }

      a:hover paper-item {
        background: var(--exmg-paper-sidemenu-hover-background-color, var(--paper-grey-200));
      }

      a[aria-selected] paper-item iron-icon,
      a[aria-selected] paper-item {
        color: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
      }

      .menu-item {
        display: block;
        text-decoration: none;
        outline: none;
      }
    </style>

    <paper-listbox class="menu-header" slot="header" attr-for-selected="data-path" selected="{{selected}}" selectable="a">
      <a href="[[_getHref(homeUrl)]]" data-path="[[homeUrl]]" tabindex="-1" class="menu-item">
        <paper-item role="menuitem">
          <iron-icon icon="[[homeIcon]]"></iron-icon>
          <span class="title">[[homeLabel]]</span>
        </paper-item>
        <exmg-paper-tooltip position="right">[[homeLabel]]</exmg-paper-tooltip>
      </a>
      <a href="[[_getHref(settingsUrl)]]" data-path="[[settingsUrl]]" tabindex="-1" class="menu-item">
        <paper-item role="menuitem" aria-label$="[[settingsLabel]]">
          <iron-icon icon="[[settingsIcon]]"></iron-icon>
        </paper-item>
        <exmg-paper-tooltip position="right">[[settingsLabel]]</exmg-paper-tooltip>
      </a>
    </paper-listbox>
  `;
  }
  /*
  * Disable links in debug mode
  */
  _getHref(path: string): string {
    return this.debug ? '#' : path;
  }
}

window.customElements.define(CmsSidemenuHeader.is, CmsSidemenuHeader);