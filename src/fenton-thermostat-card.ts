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
    .card {
      background: #181c2b;
      color: #fff;
      border-radius: 20px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-family: "Segoe UI", sans-serif;
      max-width: 400px;
    }
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .status-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 6px;
      margin-right: 22px;
    }
    .thermostat-controls {
      flex: 0 0 130px;
      background: #232323;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 130px;
      margin-left: 0;
    }
    .temp-target {
      margin: 14px 0 6px 0;
      font-size: 1.5rem;
    }
    .arrow-btn {
      color: #fff;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      width: 100%;
      transition: color 0.2s;
    }
    .arrow-btn:active {
      color: #ffe082;
    }
    .bottom-bar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 13px;
      margin-top: 6px;
    }
    .boost-btn {
      background: #353535;
      color: #ffe082;
      border: none;
      border-radius: 14px;
      font-size: 1.15rem;
      padding: 6px 18px;
      cursor: pointer;
      font-weight: bold;
      min-width: 49px;
      min-height: 37px;
      transition: background 0.2s, color 0.2s;
      outline: none;
    }
    .boost-btn[boost="60"]{ color: orange;}
    .boost-btn[boost="hw"]{ color: darkorange;}
    .boost-btn[boost="cancel"]{
      color: #fa3333;
      background: none;
      border: 2px solid #fa3333;
    }
    .boost-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: .98rem;
      font-weight: 500;
      color: #fff;
      margin-right: 14px;
      letter-spacing: 2px;
      line-height: 1;
    }
    @media (max-width: 480px) {
      .card { max-width: 99vw; padding: 2vw; }
      .thermostat-controls { height: 95px; width: 95px; }
      .temp-target { font-size: 1.1rem; }
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

  render() {
    if (!this.config) return html``;
    const t = this.config;
    return html`
      <div class="card">
        <div class="row">
          <div class="status-side">
            <div><ha-icon icon="mdi:bed"></ha-icon>
              <span style="font-size:1.2rem;font-weight:bold;vertical-align:0.12em">&nbsp;${t.title ?? "Fenton Thermostat"}</span></div>
            <div>Current: <span style="font-weight:600">${this.getEntityState(t.temp_entity)}°C</span></div>
            <div>Heating: <span>${this.getEntityState(t.heating_state_entity)}</span></div>
            <div>Hot Water: <span>${this.getEntityState(t.hotwater_state_entity)}</span></div>
            <div>Boost: <span>${this.getEntityState(t.boost_state_entity)}</span></div>
            <div>HW Boost: <span>${this.getEntityState(t.hw_boost_state_entity)}</span></div>
          </div>
          <div class="thermostat-controls">
            <button class="arrow-btn" @click=${() => this._setTemp(1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <div class="temp-target">${this.getEntityAttr(t.climate_entity, "temperature")?.toFixed(1) ?? "19.0"}°C</div>
            <button class="arrow-btn" @click=${() => this._setTemp(-1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
          </div>
        </div>
        <div class="bottom-bar">
          <span class="boost-label">BOO<br>ST</span>
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