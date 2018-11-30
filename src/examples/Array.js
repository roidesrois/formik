import React, { Fragment, Component } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { Debug } from "../components/Debug";
import * as Yup from "yup";

const initialValues = {
  groups: [
    {
      // group
      name: "Group Name",
      fields: [
        // group fields
        { name: "", type: "text", placeholder: "firstName" },
        { name: "", type: "text", placeholder: "lastName" },
        { name: "", type: "email", placeholder: "email" }
      ]
    }
  ]
};

// console.log(initialValues.pages[0].groups[0].fields[0].placeholder);

export class Invitation extends Component {
  state = {
    pages: [
      {
        // page
        step: "Page Number",
        groups: [
          {
            // group
            name: "Group Name",
            fields: [
              // group fields
              { name: "", type: "text", placeholder: "firstName" },
              { name: "", type: "text", placeholder: "lastName" },
              { name: "", type: "email", placeholder: "email" }
            ]
          }
        ]
      }
    ]
  };

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Invite group</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            groups: Yup.array().of(
              Yup.object({
                "groups.0.fields.0.name": Yup.string().required("Required"),
                "groups.0.fields.2.name": Yup.string()
                  .email("Invalid email!")
                  .required("Required")
              })
            )
          })}
          onSubmit={values => {
            console.log(values);
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {({ values, isSubmitting, handleBlur, setFieldValue }) => (
            <Form>
              <FieldArray name="groups">
                {({ push, remove }) => (
                  <Fragment>
                    {values.groups.map((group, groupIdx) => (
                      <div className="row" key={groupIdx}>
                        {group.fields &&
                          group.fields.length > 0 &&
                          group.fields.map((field, fieldIdx) => (
                            <div className="col" key={fieldIdx}>
                              {console.log(field.placeholder)}
                              <Field
                                name={`groups.${groupIdx}.fields.${fieldIdx}.name`}
                                type={field.type}
                                placeholder={field.placeholder}
                              />
                              <ErrorMessage
                                name={`groups.${groupIdx}.fields.${fieldIdx}.name`}
                              >
                                {msg => (
                                  <div className="field-error">{msg}</div>
                                )}
                              </ErrorMessage>
                            </div>
                          ))}
                        <div className="col">
                          <button
                            type="button"
                            onClick={() => remove(groupIdx)}
                          >
                            X
                          </button>
                        </div>
                        <div className="col">
                          {console.log(values.groups[0])}
                          <button
                            type="button"
                            onClick={() => push(values.groups[0])}
                            // className="secondary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                )}
              </FieldArray>
              <button type="submit" disabled={isSubmitting}>
                Invite
              </button>
              <Debug />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
// export default Invitation;

// editorState: new EditorState.createEmpty(),

// Yup.object({
//   group0: Yup.array().of(
//     Yup.object({
//       name: Yup.string().required('Required'),
//       email: Yup.string()
//         .email('Invalid email')
//         .required('Required'),
//     })
//   ),
// })
