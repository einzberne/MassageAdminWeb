import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  FormControl,
  InputLabel,
  Typography,
  CssBaseline,
} from "@mui/material";
import { Http } from "../../services/http";
import config from "../../config";
import { useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2'

const massageTypes = ["Swedish", "Deep Tissue", "Hot Stone", "Aromatherapy"];

const initialValues = {
  firstName: "",
  lastName: "",
  features: [],
};

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  }

  if (values.features.length === 0) {
    errors.features = "Please select at least one feature";
  }

  return errors;
};

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = async (values) => {
    const param = {
      uuid: searchParams.get("id"),
      firstName: values.firstName,
      lastName: values.lastName,
      features: values.features.join()
    }
    const res = await Http.post(
      `${config.API_ENDPOINT}/massager`,
      param,
      {}
    );
    console.log(res);
    if (res.status.startsWith("5")) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.response.data,
      })
    } else {
      Swal.fire(
        'Congratulation!',
        'Your registeration has been complete',
        'success'
      )
    }

    
  };
  
  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <CssBaseline />
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: "#ffff",
            borderRadius: "16px",
            padding: "24px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)",
          }}
        >
          <div>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={onSubmit}
            >
              {({ touched, errors, values, setFieldValue }) => (
                <Form>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Register
                  </Typography>
                  <div>
                    <Field
                      as={TextField}
                      name="firstName"
                      label="First Name"
                      error={touched.firstName && !!errors.firstName}
                      helperText={<ErrorMessage name="firstName" />}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Last Name"
                      error={touched.lastName && !!errors.lastName}
                      helperText={<ErrorMessage name="lastName" />}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  </div>
                  <div>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel id="features-label">Features</InputLabel>
                      <Field
                        as={Select}
                        name="features"
                        labelId="features-label"
                        multiple
                        value={values.features}
                        onChange={(e) =>
                          setFieldValue("features", e.target.value)
                        }
                        error={touched.features && !!errors.features}
                        helperText={<ErrorMessage name="features" />}
                        label="Features"
                      >
                        {massageTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ marginY: 3, height: "48px" }}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Register;
