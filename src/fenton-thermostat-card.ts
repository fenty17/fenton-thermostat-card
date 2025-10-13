import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface LovelaceCardConfig {
  type: string;
  [prop: string]: any;
}
interface HomeAssistant {
  [prop: string]: any;
}
interface FentonThermostatCardConfig extends LovelaceCardConfig {
  title?: string;
  climate_entity: string;
  temp_entity: string;
  heating_state_entity: string;
  hotwater_state_entity: string;
  boost_state_entity: string;
  hw_boost_state_entity: string;
  boost_30_script: string;
  boost_60_script: string;
  hw_boost_script: string;
  cancel_script: string;
}

@customElement('fenton-thermostat-card')
export class FentonThermostatCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: FentonThermostatCardConfig;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100vw;
    }
    .card {
      background: #181c2b;
      color: #fff;
      border-radius: 20px;
      padding: 18px 18px 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-family: "Segoe UI", sans-serif;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      max-width: 100%;
      overflow: hidden;
    }
    .row {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
      gap: 12px;
      min-width: 0;
    }
    .status-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding-left: 16px;
      min-width: 0;
      margin-top: 6px;
      justify-content: flex-start;
    }
    .sensor-list {
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 10px;
      row-gap: 5px;
      align-items: center;
      width: 100%;
      margin-top: 4px;
      margin-bottom: 0;
    }
    .sensor-label {
      text-align: left;
      font-weight: 500;
      opacity: 0.93;
      cursor: pointer;
      padding: 2px 0 2px 0;
      border-radius: 8px 0 0 8px;
      user-select: none;
      transition: background 0.17s;
    }
    .sensor-label:active, .sensor-label:hover {
      background: rgba(255,255,255,0.055);
    }
    .sensor-value {
      text-align: left;
      padding: 2px 0 2px 0;
      border-radius: 0 8px 8px 0;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      transition: background 0.17s;
    }
    .sensor-value:active, .sensor-value:hover {
      background: rgba(255,255,255,0.045);
    }
    .top-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size:1.18rem;
      font-weight:bold;
      margin-bottom: 8px;
      min-width: 0;
    }
    .thermostat-outer {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      min-width: 130px;
      min-height: 130px;
      height: 100%;
      margin-right: 20px;
    }
    .thermostat-controls {
      width: 100%;
      box-sizing: border-box;
      background: #232323;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      aspect-ratio: 1/1;
      flex: 1 1 auto;
      min-width: 120px;
      min-height: 120px;
      max-width: 305px;
      max-height: 500px;
      margin-left: 0;
      margin-top: 0;
      margin-bottom: 0;
      overflow: hidden;
    }
    .arrow-btn {
      background: none;
      border: none;
      width: 100%;
      height: 3.4em;
      min-height: 64px;
      max-height: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      margin: 0;
      transition: color 0.2s;
      border-radius: 0;
      flex: 0 0 auto;
      outline: none;
      --arrow-size: 3.2em;
      color: #fff;
    }
    .arrow-btn:active svg polygon,
    .arrow-btn:focus svg polygon {
      fill: #ffe082;
    }
    .arrow-svg {
      display: block;
      width: var(--arrow-size);
      height: var(--arrow-size);
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      pointer-events: none;
    }

    .temp-target {
      font-size: 2.5rem;
      font-weight: bold;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 0;
      cursor: pointer;
      user-select: none;
      letter-spacing: 1px;
      outline: none;
      border: none;
      background: none;
      width: 100%;
    }

    .bottom-bar {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
      margin-top: 2px;
      box-sizing: border-box;
      gap: 0;
      position: relative;
    }
    .boost-label {
      font-size: 1.07rem;
      font-weight: 500;
      color: #fff;
      letter-spacing: 1.5px;
      min-width: 44px;
      text-align: left;
      align-items: center;
      display: flex;
      height: auto;
      margin: 0;
      padding-left: 16px;
      flex: 0 0 auto;
      /* Vertically center in bar */
    }
    .boost-btns-area {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex: 1 1 0;
      gap: 27px;
      margin-left: 22px;
      min-width: 0;
      flex-wrap: wrap;
    }
    .boost-btn {
      background: #353535;
      color: #ffe082;
      border: none;
      border-radius: 14px;
      font-size: 1.15rem;
      padding: 14px 18px;
      cursor: pointer;
      font-weight: bold;
      min-width: 49px;
      min-height: 37px;
      transition: background 0.2s, color 0.2s;
      outline: none;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 1 120px;
      box-sizing: border-box;
      word-break: keep-all;
    }
    .boost-btn[boost="60"] { color: orange;}
    .boost-btn[boost="hw"] { color: darkorange;}
    .boost-btn[boost="cancel"] {
      color: #fa3333;
      background: none;
      border: 2px solid #fa3333;
    }
    /* Responsive: make boost btns wrap, shrink, prevent overflow */
    @media (max-width: 768px) {
      .card { padding: 3vw; }
      .thermostat-outer { min-width: 90px; }
      .thermostat-controls { min-width: 90px; }
      .boost-btns-area { gap: 14px; }
    }
    @media (max-width: 600px) {
      .row {
        flex-direction: row;
        align-items: flex-start;
        gap: 6vw;
      }
      .status-side { padding-left: 7px;}
      .thermostat-outer {
        min-width: 68px;
      }
      .sensor-label { font-size: 0.98rem; }
      .sensor-value { font-size: 1.09rem; }
      .boost-label { padding-left: 7px; font-size: 0.93rem;}
      .boost-btns-area { gap: 8px; margin-left: 10px;}
      .boost-btn {
        font-size: 1rem;
        min-width: 41px;
        padding: 12px 7px;
        flex-basis: 70px;
      }
    }
    @media (max-width: 480px) {
      .card { padding: 2vw; }
      .thermostat-outer { min-width: 56px;}
      .row { gap: 2vw; }
      .status-side { padding-left: 3vw;}
      .boost-label { padding-left: 3vw; }
      .boost-btns-area {
        gap: 5px;
        margin-left: 2px;
      }
      .boost-btn {
        font-size: 0.97rem;
        min-width: 34px;
        padding: 9px 2px;
        flex-basis: 40px;
      }
      .thermostat-controls {
        min-width: 0;
        width: 100%;
        max-width: unset;
        aspect-ratio: 1/1;
        min-height: 0;
        margin-right: 0;
      }
    }
    .boost-btns-area {
      /* force wrap and prevent overflow at all times*/
      flex-wrap: wrap;
    }
  `;

  setConfig(config: FentonThermostatCardConfig) {
    this.config = config;
  }

  getEntityState(entity: string) {
    return this.hass.states[entity]?.state ?? "—";
  }
  getEntityAttr(entity: string, attr: string) {
    return this.hass.states[entity]?.attributes[attr];
  }

  private _setTemp(dir: 1|-1) {
    const current = Number(this.getEntityAttr(this.config.climate_entity, "temperature")) || 19.0;
    const newTemp = Math.round((current + 0.5 * dir) * 2) / 2;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this.config.climate_entity,
      temperature: newTemp
    });
  }
  private _tap(script: string) {
    this.hass.callService("script", "turn_on", { entity_id: script });
  }
  private _moreInfo(entity: string) {
    const e = new CustomEvent("hass-more-info", {
      detail: { entityId: entity },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(e);
  }
  private _heatingOn() {
    const state = (this.getEntityState(this.config.heating_state_entity) ?? "").toLowerCase();
    return state === "on" || state === "heat" || state === "heating";
  }
  private _thermoIcon() {
    return this._heatingOn() ? "mdi:radiator" : "mdi:radiator-disabled";
  }
  private _thermoIconColor() {
    return this._heatingOn() ? "orange" : "#888";
  }

  // SVGs for big up/down arrows (outline triangles, always visible and scale)
  private _arrowSVG(direction: "up" | "down") {
    return html`
      <svg class="arrow-svg" viewBox="0 0 100 100">
        ${direction === "up"
          ? html`<polygon points="50,15 95,75 5,75" fill="currentColor" />`
          : html`<polygon points="5,25 95,25 50,85" fill="currentColor" />`
        }
      </svg>
    `;
  }

  render() {
    if (!this.config) return html``;
    const t = this.config;
    const currentTemp = this.getEntityAttr(t.climate_entity, "temperature");
    const sensors = [
      {
        label: "Current:",
        entity: t.temp_entity,
        value: `${this.getEntityState(t.temp_entity)}°C`
      },
      {
        label: "Heating:",
        entity: t.heating_state_entity,
        value: this.getEntityState(t.heating_state_entity)
      },
      {
        label: "Hot Water:",
        entity: t.hotwater_state_entity,
        value: this.getEntityState(t.hotwater_state_entity)
      },
      {
        label: "Boost:",
        entity: t.boost_state_entity,
        value: this.getEntityState(t.boost_state_entity)
      },
      {
        label: "HW Boost:",
        entity: t.hw_boost_state_entity,
        value: this.getEntityState(t.hw_boost_state_entity)
      },
    ];
    return html`
      <div class="card">
        <div class="row">
          <div class="status-side">
            <div class="top-title-row">
              <ha-icon
                icon="${this._thermoIcon()}"
                style="--mdc-icon-size: 28px; color:${this._thermoIconColor()}"
                title="Thermostat"
              ></ha-icon>
              <span style="vertical-align:0.06em;white-space:nowrap;">${t.title ?? "Fenton Thermostat"}</span>
            </div>
            <div class="sensor-list">
              ${sensors.map(
                s => [
                  html`<div class="sensor-label"
                    @click=${() => this._moreInfo(s.entity)}
                    title="Open details"
                  >${s.label}</div>`,
                  html`<div class="sensor-value"
                    @click=${() => this._moreInfo(s.entity)}
                    title="Open details"
                  >${s.value}</div>`
                ]
              )}
            </div>
          </div>
          <div class="thermostat-outer">
            <div class="thermostat-controls">
              <button class="arrow-btn" @click=${() => this._setTemp(1)} aria-label="Increase temperature">
                ${this._arrowSVG("up")}
              </button>
              <div class="temp-target"
                   tabindex="0"
                   title="Show climate info"
                   @click=${() => this._moreInfo(t.climate_entity)}
                   @keydown=${(e: KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") this._moreInfo(t.climate_entity)
                   }}>
                ${currentTemp !== undefined
                  ? Number(currentTemp).toFixed(1)
                  : "19.0"}°C
              </div>
              <button class="arrow-btn" @click=${() => this._setTemp(-1)} aria-label="Decrease temperature">
                ${this._arrowSVG("down")}
              </button>
            </div>
          </div>
        </div>
        <div class="bottom-bar">
          <span class="boost-label" style="align-items:center;display:flex;">BOOST</span>
          <div class="boost-btns-area">
            <button class="boost-btn" @click=${() => this._tap(t.boost_30_script)}>30m</button>
            <button class="boost-btn" boost="60" @click=${() => this._tap(t.boost_60_script)}>60m</button>
            <button class="boost-btn" boost="hw" @click=${() => this._tap(t.hw_boost_script)}>HW</button>
            <button class="boost-btn" boost="cancel" @click=${() => this._tap(t.cancel_script)}>X</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fenton-thermostat-card': FentonThermostatCard;
  }
}