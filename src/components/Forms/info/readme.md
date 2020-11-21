## how to use
```
import {UIForm} from "src/components";

interface IFormValues {
  value: string
}
const Foo = () => {
  const initialValues: IFormValues = {
    value: '',
  };

  return (
    <UIForm<IFormValues>
      name='name-of-form'
      id="id-of-form" 
      gridArea={area.form}
      initialValues={initialValues}
      onSubmit={values => { ... }}
    >{(values, helpers) => {
      <React.Fragment>
        <FormField name="value" type="text" required autoComplete="given-name" />
      <React.Fragment/>
    }}</UIForm>
  );
};
```
