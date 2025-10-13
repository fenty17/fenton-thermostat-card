import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
interface LovelaceCardConfig {
  type: string;
  [prop: string]: any;
}
interface HomeAssistant {
  // empty marker, you can type just as 'any'
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
      box-sizing: border-box;
      max-width: 100%;
      min-width: 0;
    }
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      gap: 12px;
    }
    .status-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 8px;
      margin-right: 12px;
      padding-left: 16px;
      min-width: 0;
      margin-top: 6px;
    }
    .sensor-line {
      cursor: pointer;
      user-select: none;
      border-radius: 8px;
      padding: 2px 0 2px 4px;
      transition: background 0.17s;
    }
    .sensor-line:active, .sensor-line:hover {
      background: rgba(255,255,255,0.06);
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
    .thermostat-controls {
      flex: 0 0 168px;
      background: #232323;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      height: 168px;
      min-width: 110px;
      margin-left: 0;
      box-sizing: border-box;
      min-height: 0;
    }
    .arrow-btn {
      color: #fff;
      background: none;
      border: none;
      font-size: 2.3rem;
      cursor: pointer;
      width: 100%;
      flex: 1;
      min-height: 0;
      padding: 0;
      transition: color 0.2s;
      border-radius: 0;
    }
    .arrow-btn:active {
      color: #ffe082;
    }
    .temp-target {
      margin: 2px 0 2px 0;
      font-size: 1.9rem;
      font-weight: bold;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      letter-spacing: 1px;
    }
    .bottom-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      width: 100%;
      margin-top: 2px;
    }
    .boost-label {
      font-size: 1.02rem;
      font-weight: 500;
      color: #fff;
      margin-right: 6px;
      letter-spacing: 1.5px;
      min-width: 44px;
      text-align: center;
      line-height: 1;
      align-items: center;
      display: flex;
      height: 34px;
    }
    .boost-btn {
      background: #353535;
      color: #ffe082;
      border: none;
      border-radius: 14px;
      font-size: 1.13rem;
      padding: 6px 13px;
      cursor: pointer;
      font-weight: bold;
      min-width: 44px;
      min-height: 34px;
      transition: background 0.16s, color 0.16s;
      outline: none;
      margin: 0;
    }
    .boost-btn[boost="60"]{ color: orange;}
    .boost-btn[boost="hw"]{ color: darkorange;}
    .boost-btn[boost="cancel"]{
      color: #fa3333;
      background: none;
      border: 2px solid #fa3333;
    }
    @media (max-width: 600px) {
      .card { padding: 2vw 2vw 2vw 2vw; }
      .thermostat-controls { height: 110px; min-width: 80px; }
      .temp-target { font-size: 1.2rem; }
      .boost-label { font-size: .93rem; }
      .status-side { padding-left: 7px; gap: 6px;}
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
  private _thermoIconColor() {
    const state = (this.getEntityState(this.config.heating_state_entity) ?? "").toLowerCase();
    return state === "on" || state === "heat" || state === "heating" ? "#ffe082" : "#888";
  }

  render() {
    if (!this.config) return html``;
    const t = this.config;
    const currentTemp = this.getEntityAttr(t.climate_entity, "temperature");
    return html`
      <div class="card">
        <div class="row">
          <div class="status-side">
            <div class="top-title-row">
              <ha-icon
                icon="mdi:radiator"
                style="--mdc-icon-size: 28px; color:${this._thermoIconColor()}"
                title="Thermostat"
              ></ha-icon>
              <span style="vertical-align:0.06em;white-space:nowrap;">${t.title ?? "Fenton Thermostat"}</span>
            </div>
            <div class="sensor-line" @click=${() => this._moreInfo(t.temp_entity)} title="Open details">
              Current: <span style="font-weight:600">${this.getEntityState(t.temp_entity)}°C</span>
            </div>
            <div class="sensor-line" @click=${() => this._moreInfo(t.heating_state_entity)} title="Open details">
              Heating: <span>${this.getEntityState(t.heating_state_entity)}</span>
            </div>
            <div class="sensor-line" @click=${() => this._moreInfo(t.hotwater_state_entity)} title="Open details">
              Hot Water: <span>${this.getEntityState(t.hotwater_state_entity)}</span>
            </div>
            <div class="sensor-line" @click=${() => this._moreInfo(t.boost_state_entity)} title="Open details">
              Boost: <span>${this.getEntityState(t.boost_state_entity)}</span>
            </div>
            <div class="sensor-line" @click=${() => this._moreInfo(t.hw_boost_state_entity)} title="Open details">
              HW Boost: <span>${this.getEntityState(t.hw_boost_state_entity)}</span>
            </div>
          </div>
          <div class="thermostat-controls">
            <button class="arrow-btn" @click=${() => this._setTemp(1)} aria-label="Increase temperature">
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
            <button class="arrow-btn" @click=${() => this._setTemp(-1)} aria-label="Decrease temperature">
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
          </div>
        </div>
        <div class="bottom-bar">
          <span class="boost-label">BOOST</span>
          <button class="boost-btn" @click=${() => this._tap(t.boost_30_script)}>30m</button>
          <button class="boost-btn" boost="60" @click=${() => this._tap(t.boost_60_script)}>60m</button>
          <button class="boost-btn" boost="hw" @click=${() => this._tap(t.hw_boost_script)}>HW</button>
          <button class="boost-btn" boost="cancel" @click=${() => this._tap(t.cancel_script)}>X</button>
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