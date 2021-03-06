import { h } from 'preact';
import { Fragment } from 'preact/compat';
import PropTypes from 'prop-types';

const Sample = (props) => (
  <>
    <label >
      Fundamental (Hz)
      <input name="fundamental" type="number"
             value={props.settings.fundamental}
             step="any" min="0.015625" max="16384"
             onChange={(e) => props.onChange(e.target.name, parseFloat(e.target.value))}/>
    </label>
    <label>
      Instrument
      <Instruments value={props.settings.instrument}
                   groups={props.instruments}
                   onChange={props.onChange}/>
    </label>
  </>
);

Sample.propTypes = {
  onChange: PropTypes.func.isRequired,
  instruments: PropTypes.array,
  settings: PropTypes.shape({
    fundamental: PropTypes.number,
    instrument: PropTypes.string,
  }),
};

const Instruments = (props) => (
  <select name="instrument"
          value={props.value}
          onChange={(e) => props.onChange(e.target.name, e.target.value)} >
    {props.groups.map(group => (
      <optgroup label={group.name}>
        { group.instruments.map(instrument => (
          <option value={instrument.fileName}>{instrument.name}</option>
        ))}
      </optgroup>
    ))}
  </select>
);

Instruments.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    instruments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
    })),
  })),
}

export default Sample;
