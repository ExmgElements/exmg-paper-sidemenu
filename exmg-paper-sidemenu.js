import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@exmg/exmg-paper-tooltip/exmg-paper-tooltip.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import './exmg-paper-sidemenu-icons.js';

/**
 * The `exmg-paper-sidemenu` displays a vertical sidemenu that can be collapsed.
 *
 *  ### Menu data model
 *  Menu items need to have the following structure:
 *  ```js
 *  {
 *    "path": "user/", // Path for href and selection
 *    "icon": "dev-icons:people", // Icon that needs to be pre-loaded
 *    "title": "Users" // Copy to display
 *  }
 *  ```
 *
 *  Grouping menu items will be done in the following structure:
 *  ```js
 *  {
 *    "title": "Users",
 *    "items": [
 *      {
 *        "path": "user/",
 *        "icon": "dev-icons:people",
 *        "title": "Users"
 *      },
 *      {
 *        "path": "redeem/",
 *        "icon": "dev-icons:attach-money",
 *        "title": "Redeem Requests"
 *      },
 *      {
 *        "path": "reporteduser/",
 *        "icon": "dev-icons:feedback",
 *        "title": "Reported Users"
 *      }
 *    ]
 *  }
 *  ```
 *
 *  ### Styling
 *
 * `<exmg-paper-sidemenu>` provides the following custom properties and mixins
 *  for styling:
 *
 *  Custom property | Description | Default
 *  ----------------|-------------|----------
 *  `--exmg-paper-sidemenu` | Sidemenu mixin |`{}`
 *  `--exmg-paper-sidemenu-background` | Sidemenu background color | `white`
 *  `--exmg-paper-sidemenu-group-text-color` | Group titletext color | `54% black`
 *  `--exmg-paper-sidemenu-group-title` | Group title mixin | `{}`
 *  `--exmg-paper-sidemenu-item-text-color` | Item text color | `54% black`
 *  `--exmg-paper-sidemenu-item` | Menu item mixin | `{}`
 *  `--exmg-paper-sidemenu-item-title` | Menu item title mixin | `{}`
 *  `--exmg-paper-sidemenu-menu-body` | Menu body mixin | `{}`
 *  `--exmg-paper-sidemenu-menu-footer-background-color` | Footer background color | `#F9FAF9`
 *  `--exmg-paper-sidemenu-menu-footer` | Menu footer mixin | `{}`
 *  `--exmg-paper-sidemenu-icon-color` | Sidemenu icon color | `54% black`
 *  `--exmg-paper-sidemenu-badge-background-color` | Item badge background color | `--secondary-text-color`
 *  `--exmg-paper-sidemenu-badge-text-color` | Item badge text color | white
 *  `--exmg-paper-sidemenu-badge` | Item badge mixin | `{}`
 *  `--exmg-paper-sidemenu-hover-background-color` | Item hover background color | `--paper-grey-200`
 *  `--exmg-paper-sidemenu-selected-text-color` | Item selected text color | `--primary-color`
 *
 *  @customElement
 *  @polymer
 *  @memberof Exmg
 *  @group Exmg Paper Elements
 *  @element exmg-paper-sidemenu
 *  @demo demo/index.html
 */
export class SidemenuElement extends PolymerElement {
  static get is() {
    return 'exmg-paper-sidemenu';
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
      * For selection you can use the path value
      */
      menu: {
        type: Array,
      },
      /*
      * Property that determines the element display style collapsed of expanded
      */
      collapsed: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false,
        observer: '_observeCollapsed',
      },
      /*
      * The narrow option can be used to disable collapsing of the menu.
      */
      narrow: {
        type: Boolean,
        value: false,
      },
    };
  }
  static get observers() {
    return [
      '_observeNarrow(narrow)',
    ];
  }
  static get template() {
    return html`
    <style>
      :host {
        height: 100%;
        background-color: var(--exmg-paper-sidemenu-background, white);
        box-shadow: 2px 0 2px 0 rgba(0, 0, 0, .1);
        transition: all 0.3s ease;
        @apply --layout-flex;
        @apply --layout-vertical;
        @apply --exmg-paper-sidemenu;
      }

      .menu-group-title {
        display: block;
        box-sizing: border-box;
        padding: 8px 20px 10px;
        overflow: hidden;
        cursor: default;
        font-size: 12px;
        letter-spacing: .5px;
        text-transform: uppercase;
        transition: all .3s ease;
        color: var(--exmg-paper-sidemenu-group-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
        @apply --exmg-paper-sidemenu-group-title;
      }

      hr {
        border: none;
        background: #ddd;
        margin: 8px 0 0;
        height: 0;
        @apply --exmg-paper-sidemenu-group-hr;
      }

      :host([collapsed]) hr {
        height: 1px;
      }

      .menu-item {
        display: block;
        text-decoration: none;
        outline: none;
      }

      .menu-item.solo {
        padding-top: 10px;
      }

      paper-listbox {
        padding: 0;
        background: var( --exmg-paper-sidemenu-background);
      }

      paper-item {
        height: 32px;
        min-height: auto;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
        color: var(--exmg-paper-sidemenu-item-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
        cursor: pointer;
        @apply --exmg-paper-sidemenu-item;
      }

      a svg{
        fill: var(--exmg-paper-sidemenu-item-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
      }

      paper-item .title {
        @apply --layout-flex;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        opacity: 1;
        transition: all .4s ease;
        @apply --exmg-paper-sidemenu-item-title;
      }

      :host([collapsed]) paper-item .title {
        opacity: 0;
        max-width: 0px;
      }

      paper-item svg,
      paper-item iron-icon {
        padding-right: 12px;
        width: 24px;
        max-width: 24px;
        height: 20px;
        margin: 0 auto;
      }

      exmg-paper-tooltip {
        display: none;
        white-space: nowrap;
      }

      .menu-body {
        @apply --layout-flex;
        overflow: auto;
        @apply --exmg-paper-sidemenu-menu-body;
      }

      .menu-footer {
        border-top: 1px solid #ddd;
        background: var(--exmg-paper-sidemenu-menu-footer-background-color, #F9FAF9);
        min-height: 48px;
        @apply --layout;
        @apply --layout-end-justified;
        @apply --layout-center;
        @apply --exmg-paper-sidemenu-menu-footer;
      }

      .menu-footer paper-icon-button {
        transition: transform .3s ease;
        transform: rotate(0deg);
        @apply --layout-end-justified;
      }

      .menu-footer paper-icon-button {
        margin: 0 4px;
        color: var(--exmg-paper-sidemenu-icon-color, rgba(0, 0, 0, var(--dark-secondary-opacity)));
      }

      :host([narrow]) .menu-footer {
        display: none !important;
      }

      :host([collapsed]) .menu-footer {
        @apply --layout;
        @apply --layout-center-justified;
        @apply --layout-center;
      }

      :host([collapsed]) paper-item svg { padding: 0; }
      :host([collapsed]) paper-item iron-icon { padding: 0; }
      :host([collapsed]) .menu-group {
        padding: 12px 0;
      }
      :host([collapsed]) .menu-group-title {
        height: 0;
        padding: 0;
        margin-bottom: 10px;
      }

      :host([collapsed]) paper-item {
        height: 36px;
      }

      :host([collapsed]) exmg-paper-tooltip {
        display: block;
      }

      :host([collapsed]) .menu-footer paper-icon-button {
        transform: rotate(180deg);
      }

      .title-badge, .icon-badge {
        display: inline-block;
        font-size: 11px;
        border-radius: 12px;
        background-color: var(--exmg-paper-sidemenu-badge-background-color, var(--secondary-text-color));
        color: var(--exmg-paper-sidemenu-badge-text-color, white);
        line-height: 1;
        padding: 2px 4px;
        min-width: 16px;
        text-align: center;
        @apply --exmg-paper-sidemenu-badge;
      }

      .icon-badge {
        display: none;
        position: absolute;
        left: calc(50% + 4px);
        top: 0px;
      }

      :host([collapsed]) .icon-badge {
        display: block;
      }

      a:hover paper-item {
        background: var(--exmg-paper-sidemenu-hover-background-color, var(--paper-grey-200));
      }

      a[aria-selected] svg{
        fill: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
      }
      a[aria-selected] paper-item {
        color: var(--exmg-paper-sidemenu-selected-text-color, var(--primary-color));
      }

    </style>

    <!-- Sidemenu Header -->
    <slot name="header"></slot>

    <!-- Sidemenu body -->
    <div class="menu-body" role="navigation">

      <!-- Menu Items -->
      <paper-listbox attr-for-selected="data-path" selected="{{selected}}" selectable="a">
        <template is="dom-repeat" items="[[menu]]" as="item">
          <template is="dom-if" if="[[!_hasItems(item)]]">
            <a href="[[_getHref(item.path)]]" data-path$="[[item.path]]" tabindex="-1" class="menu-item solo">
              <paper-item data-path$="[[item.path]]" role="menuitem">
                <template is="dom-if" if="[[item.icon-svg-path]]" restamp>
                  <svg height="24" viewBox="0 0 24 24" width="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                </template>
                <template is="dom-if" if="[[!item.icon-svg-path]]" restamp>
                  <iron-icon icon="[[item.icon]]"></iron-icon>
                </template>
                <span class="title">[[item.title]]</span>
              </paper-item>
              <exmg-paper-tooltip position="right">[[item.title]]</exmg-paper-tooltip>
            </a>
          </template>
          <template is="dom-if" if="[[_hasItems(item)]]">
            <div class="menu-group-title">[[item.title]]</div>
            <template is="dom-repeat" items="[[item.items]]" as="subitem">
              <a href="[[_getHref(subitem.path)]]" data-path$="[[subitem.path]]" tabindex="-1" class="menu-item">
                <paper-item data-path$="[[subitem.path]]" class$="[[_hasClassBadge(subitem)]]" role="menuitem">
                  <template is="dom-if" if="[[subitem.icon-svg-path]]" restamp>
                    <svg height="24" viewBox="0 0 24 24" width="24"><path d$="[[subitem.icon-svg-path]]"></path></svg>
                  </template>
                  <template is="dom-if" if="[[!subitem.icon-svg-path]]" restamp>
                    <iron-icon icon="[[subitem.icon]]"></iron-icon>
                  </template>
                  <template is="dom-if" if="[[subitem.badgeCount]]">
                    <span class="icon-badge">[[_computeBadgeCount(subitem)]]</span>
                  </template>
                  <span class="title">[[subitem.title]]
                    <template is="dom-if" if="[[subitem.badgeCount]]"><span class="title-badge">[[subitem.badgeCount]]</span></template>
                  </span>
                </paper-item>
                <exmg-paper-tooltip position="right">[[subitem.title]]</exmg-paper-tooltip>
              </a>
            </template>
          </template>
          <hr>
        </template>
      </paper-listbox>
    </div>

    <!-- Sidemenu Footer -->
    <div class="menu-footer">
      <paper-icon-button icon="exmg-paper-sidemenu-icons:chevron-left" on-tap="_handleCollapse"></paper-icon-button>
    </div>
  `;
  }
  _observeCollapsed(collapsed) {
    this.dispatchEvent(new CustomEvent('collapsed', {bubbles: false, composed: true, detail: collapsed}));
  }
  _observeNarrow(narrow) {
    if (narrow && this.collapsed) {
      this.set('collapsed', false);
    }
  }
  _getHref(path) {
    return this.debug ? '#' : path;
  }
  _hasItems(item) {
    return item.items;
  }
  _hasClassBadge(item) {
    return item.badgeCount ? 'badge' : '';
  }
  _computeBadgeCount(item) {
    return item.badgeCount > 99 ? '...' : item.badgeCount;
  }
  _handleCollapse() {
    this.set('collapsed', !this.collapsed);
  }
}

window.customElements.define(SidemenuElement.is, SidemenuElement);
