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
  boost_30_button: string;
  boost_60_button: string;
  hw_boost_button: string;
  cancel_boost_button: string;
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
      margin-right: 20px;
    }
    .thermostat-controls {
      position: relative;
      width: 100%;
      aspect-ratio: 1/1;
      background: #232323;
      border-radius: 20px;
      min-width: 120px;
      min-height: 120px;
      max-width: 305px;
      max-height: 500px;
      margin: 0;
      box-sizing: border-box;
      overflow: hidden;
      display: block;
    }
    .arrow-btn {
      position: absolute;
      left: 0; right: 0;
      width: 100%;
      color: #fff;
      background: none;
      border: none;
      font-size: 2.3rem;
      cursor: pointer;
      transition: color 0.2s;
      border-radius: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      /* Make tap zones larger: */
      min-height: 56px;
      height: 19%;
    }
    .arrow-btn--up {
      top: 0;
      /* Don't let the click/tap area overlap the target temp */
    }
    .arrow-btn--down {
      bottom: 0;
    }
    .arrow-btn:active, .arrow-btn:focus {
      color: #ffe082;
    }
    .temp-target {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
      letter-spacing: 1px;
      cursor: pointer;
      user-select: none;
      outline: none;
      border: none;
      background: none;
      width: 100%;
      height: 100%;
      z-index: 2;
      margin: 0;
    }
    .bottom-bar {
      display: grid;
      grid-template-columns: max-content 1fr;
      align-items: center;
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
    }
    .boost-btns-area {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      width: 100%;
      padding-left: 16px;
      padding-right: 10px; /* Padding from right edge */
      box-sizing: border-box;
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
      box-sizing: border-box;
      word-break: keep-all;
      width: 100%;
    }
    .boost-btn[boost="60"] { color: orange;}
    .boost-btn[boost="hw"] { color: darkorange;}
    .boost-btn[boost="cancel"] {
      color: #fa3333;
      background: none;
      border: 2px solid #fa3333;
    }
    @media (max-width: 670px) {
      .boost-btns-area {
        gap: 10px;
        padding-right: 5px;
      }
    }
    @media (max-width: 570px) {
      .boost-btns-area {
        gap: 6px;
        padding-left: 7px;
        padding-right: 1vw;
      }
      .card { padding: 2vw; }
      .bottom-bar { font-size: 0.95rem;}
    }
    @media (max-width: 520px) {
      .boost-btns-area {
        grid-template-columns: repeat(2, 1fr);
        row-gap: 10px;
        padding-left: 4px;
        padding-right: 3px;
      }
    }
    @media (max-width: 400px) {
      .boost-btns-area {
        grid-template-columns: 1fr;
        gap: 8px;
        padding-left: 2px;
        padding-right: 2px;
      }
    }
    @media (max-width: 768px) {
      .thermostat-outer { min-width: 90px; }
      .thermostat-controls { min-width: 90px; }
    }
    @media (max-width: 600px) {
      .row {
        flex-direction: row;
        align-items: flex-start;
        gap: 6vw;
      }
      .status-side { padding-left: 7px;}
      .thermostat-outer { min-width: 68px; }
      .sensor-label { font-size: 0.98rem; }
      .sensor-value { font-size: 1.09rem; }
      .boost-label { padding-left: 7px; font-size: 0.93rem;}
      .thermostat-controls {
        min-width: 0;
        width: 100%;
        max-width: unset;
        aspect-ratio: 1/1;
        min-height: 0;
        margin-right: 0;
      }
    }
    @media (max-width: 480px) {
      .card { padding: 2vw; }
      .thermostat-outer { min-width: 56px;}
      .row { gap: 2vw; }
      .status-side { padding-left: 3vw;}
      .boost-label { padding-left: 3vw;}
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

  private _haptic(type: "light" | "medium" | "heavy" = "light") {
    // Standard Home Assistant haptic event (works on mobile app! web UI fallback too)
    window.dispatchEvent(
      new CustomEvent("hass-haptic", {
        detail: { haptic: type }
      })
    );
  }

  private _setTemp(dir: 1|-1) {
    this._haptic("light");
    const current = Number(this.getEntityAttr(this.config.climate_entity, "temperature")) || 19.0;
    const newTemp = Math.round((current + 0.5 * dir) * 2) / 2;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this.config.climate_entity,
      temperature: newTemp
    });
  }
  private _pressButton(entity_id: string) {
    this._haptic("light");
    this.hass.callService("input_button", "press", { entity_id });
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
              <button class="arrow-btn arrow-btn--up"
                @click=${() => this._setTemp(1)} aria-label="Increase temperature">
                <ha-icon icon="mdi:chevron-up"></ha-icon>
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
              <button class="arrow-btn arrow-btn--down"
                @click=${() => this._setTemp(-1)} aria-label="Decrease temperature">
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="bottom-bar">
          <span class="boost-label" style="align-items:center;display:flex;">BOOST</span>
          <div class="boost-btns-area">
            <button class="boost-btn"
              @click=${() => this._pressButton(t.boost_30_button)}>
              30m
            </button>
            <button class="boost-btn"
              boost="60"
              @click=${() => this._pressButton(t.boost_60_button)}>
              60m
            </button>
            <button class="boost-btn"
              boost="hw"
              @click=${() => this._pressButton(t.hw_boost_button)}>
              HW
            </button>
            <button class="boost-btn"
              boost="cancel"
              @click=${() => this._pressButton(t.cancel_boost_button)}>
              X
            </button>
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