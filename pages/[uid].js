import axios from "axios";
import { parseCookies } from "../helper/cookie";
import baseUrl from "../helper/baseURL";
import Image from "next/image";

export default function User({ user }) {
  console.log(user);
  return (
    <section className="user">
      <div className="container card">
        <section className="gallery">
          <div className="gallery-item image">
            <Image
              src={user.profile?.base64 ? user.profile.base64 : "/user.png"}
              alt="profile"
              layout="intrinsic"
              height="250"
              width="250"
            />
          </div>
          <div className="gallery-item image">
            <Image
              src={
                user.qualificationProof?.base64
                  ? user.qualification.base64
                  : "/user.png"
              }
              alt="profile"
              layout="intrinsic"
              height="250"
              width="250"
            />
          </div>
          <div className="gallery-item image">
            <Image
              src={user.idProof?.base64 ? user.idProof.base64 : "/user.png"}
              alt="profile"
              layout="intrinsic"
              height="250"
              width="250"
            />
          </div>
          <div className="gallery-item image">
            <Image
              src={user.signature?.base64 ? user.signature.base64 : "/user.png"}
              alt="profile"
              layout="intrinsic"
              height="250"
              width="250"
            />
          </div>
        </section>

        <div className="wrapper flex">
          <ul className="heading">
            <li>Name</li>
            <li>Father&apos;s name</li>
            <li>Gender</li>
            <li>Phone no.</li>
            <li>E-mail</li>
            <li>Alternate Phone no.</li>
            <li>Address</li>
            <li>Skill</li>
            <li>Experience</li>
            <li>Qualification</li>
            <li>Approved</li>
          </ul>
          <ul>
            <li>{user.name}</li>
            <li>{user.fatherName}</li>
            <li>{user.gender}</li>
            <li>{user.phone}</li>
            <li>{user.email}</li>
            <li>{user.alternatePhone}</li>
            <li>{user.address}</li>
            <li>{user.skill}</li>
            <li>{user.experience}</li>
            <li>{user.qualification}</li>
            <li>{user.approved ? "True" : "False"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const { data } = await axios.get(`${baseUrl}/api/${params.uid}`);

  return {
    props: { token: token, user: data }, // will be passed to the page component as props
  };
}
