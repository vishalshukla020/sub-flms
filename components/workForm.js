import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useRouter} from "next/router"
import Image from "next/image"

export default function WorkForm() {
  const router=useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState({
    profile: "",
    signature: "",
    idProof: "",
    qualificationProof: "",
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const checkSize = (file, type) => {
    if (file.size > "50kb") {
      alert("File size should be less than 50kB");
      return;
    }
    setFiles({ ...files, [type]: file });
  };

  return (
    <section className="work-form">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Request Submitted"
      />
      <center>
        <Image src="/logo.png" height={125} width={140} alt="logo" layout='intrinsic'/>
      </center>
      <Formik
        enableReinitialize
        initialValues={{
          formName: "work",
          name: "",
          fatherName: "",
          phone: "",
          alternatePhone: "",
          email: "",
          qualification: "",
          city: "",
          address: "",
          gender: "male",
          skill: "securityGuard",
          experience: "0",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          fatherName: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          qualification: Yup.string().required("Required"),
          address: Yup.string().required("Required"),

          email: Yup.string().email("Invalid email").required("Required"),
          phone: Yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(1000000000, "Enter a 10 digit phone number")
            .required("A phone number is required"),
          alternatePhone: Yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(1000000000, "Enter a 10 digit phone number")
            .required("A phone number is required"),
          gender: Yup.string().required("Required").ensure(),
          skill: Yup.string().required("Required").ensure(),
          experience: Yup.string().required("Required").ensure(),
        })}
        onSubmit={(values, actions) => {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
          }, 4000);

          axios
            .post("/api/form", { ...values, ...files })
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                handleClick();
                setTimeout(() => {
                  alert(
                    "Your form has been submitted successfully. You are being redirected to home page"
                  );
                  router.push("https://flmsservices.in/");
                }, 2000);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
          actions.resetForm();
          setFiles(() => ({
            profile: "",
            signature: "",
            idProof: "",
            qualificationProof: "",
          }));
        }}
      >
        {(formik) => (
          <Form className="form">
            <h2 className="h2">Work with us</h2>
            <span className="underline"></span>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="name"
                label="name / नाम"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="fatherName"
                label="Father's name / पिता का नाम "
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="phone"
                label="Phone number / फ़ोन नंबर"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="alternatePhone"
                label="Alternate Phone number / अन्य  फ़ोन नंबर"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="email"
                label="E-mail / ई-मेल "
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="qualification"
                label="Qualification / योग्यता "
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="city"
                label="City / शहर"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <Field
                fullWidth
                component={TextField}
                name="address"
                label="Address / पता"
                variant="outlined"
                multiline
                rows={4}
              />
            </div>
            <div className="form-group filebase">
              <label className="label">Profile Photo: </label>
              <FileBase64
                required
                name="profile"
                onDone={(base64) => checkSize(base64, "profile")}
              />
            </div>
            <div className="form-group filebase">
              <label className="label">Your Signature: </label>
              <FileBase64
                required
                name="signature"
                onDone={(base64) => checkSize(base64, "signature")}
              />
            </div>
            <div className="form-group filebase">
              <label className="label">ID & Address proof: </label>
              <FileBase64
                required
                name="idProof"
                onDone={(base64) => checkSize(base64, "idProof")}
              />
            </div>
            <div className="form-group filebase">
              <label className="label">Your Qualification: </label>
              <FileBase64
                required
                name="qualificationProof"
                onDone={(base64) => checkSize(base64, "qualificationProof")}
              />
            </div>
            <div className="form-group">
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="gender-name">Gender / लिंग</InputLabel>
                <Field
                  component={Select}
                  name="gender"
                  id="gender-name"
                  inputProps={{ id: "gender-name" }}
                >
                  <MenuItem value="male" selected>
                    Male
                  </MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="skill-name">Skill / कौशल</InputLabel>
                <Field
                  component={Select}
                  name="skill"
                  id="skill-name"
                  inputProps={{ id: "skill-name" }}
                >
                  <MenuItem value="securityGuard">
                    Security Guard / सुरक्षा कर्मी
                  </MenuItem>
                  <MenuItem value="janitor">Janitor / सफाई वाला</MenuItem>
                  <MenuItem value="peon">Peon / चपरास</MenuItem>
                  <MenuItem value="electrician">
                    Electrician / बिजली मिस्त्री
                  </MenuItem>
                  <MenuItem value="plumber">Plumber / प्लम्बर</MenuItem>
                  <MenuItem value="mason">Mason / मिस्</MenuItem>
                  <MenuItem value="computerOperator">
                    Computer Operator / कंप्यूटर ऑपरेटर
                  </MenuItem>
                </Field>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="experience-name">
                  Work Experience / काम का अनुभव
                </InputLabel>
                <Field
                  component={Select}
                  name="experience"
                  id="experience-name"
                  inputProps={{ id: "experience-name" }}
                >
                  <MenuItem value="0">0 / Fresher</MenuItem>
                  <MenuItem value="1">1 Year / 1 वर्ष</MenuItem>
                  <MenuItem value="2">2 Year / 2 वर्ष</MenuItem>
                  <MenuItem value="5+">5+ Year / 5+ वर्ष</MenuItem>
                  <MenuItem value="10+">10+ Year / 10+ वर्ष</MenuItem>
                  <MenuItem value="15+">15+ Year / 15+ वर्ष</MenuItem>
                </Field>
              </FormControl>
            </div>
            {submitting ? (
              <CircularProgress />
            ) : (
              <input
                type="submit"
                className="btn-primary"
                value="submit job application"
              />
            )}
            <a className="btn-primary home-link" href="https://flmsservices.in/">
              Home
            </a>
          </Form>
        )}
      </Formik>
    </section>
  );
}
