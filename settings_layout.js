import { h } from 'preact';

const Layout = (props) => (
  <fieldset>
    <legend>Layout</legend>
    <label>
      Right Facing Steps
      <input name="rSteps" type="number"
             value={props.settings.rSteps}
             min="-1220" max="1220"

             onChange={props.onChange}/>
    </label>
    <label>
      Up/Right Facing Steps
      <input name="urSteps" type="number"
             value={props.settings.urSteps}
             min="-1220" max="1220"

             onChange={props.onChange}/>
    </label>
    <label>
      Hex Size (pixels)
      <input name="hexSize" type="number"
             step="any" min="20" max="1000"
             value={props.settings.hexSize}

             onChange={props.onChange}
      />
    </label>
    <label>
      Rotation (degrees)
      <input name="rotation" type="number"
             value={props.settings.rotation}
             step="any" min="0" max="360"
             onChange={props.onChange}
             />
    </label>

  </fieldset>
);

export default Layout;
