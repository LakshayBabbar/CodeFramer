import WebEditor from "@/components/Editor/WebEditor";

const Page = () => {
  const data = {
    html: `<div class="container">
  <h1>Welcome to <br/><span>CodeFramer</span></h1>
  <p>CodeFramer is a versatile code editor built to enhance your coding experience with its intuitive interface and
    powerful
    features.
  <p>
</div>`,
    css: `body {
    font-family: "inter";
    text-align: center;
    color: aliceblue;
    background: rgb(2, 2, 35);
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.container h1 {
    font-size: 2rem;
    margin: 0;
}

.container h1 span {
    font-size: 6rem;
    color: transparent;
    background: linear-gradient(90deg, rgba(217, 171, 255, 1) 0%, rgba(237, 63, 255, 1) 40%, rgba(149, 0, 255, 1) 68%, rgba(78, 39, 255, 1) 100%);
    background-clip: text;
}

.container p {
    font-size: 1.2rem;
    max-width: 40rem;
    line-height: 1.5;
}

@media(max-width:768px) {
    .container h1 {
        font-size: 1rem;
    }

    .container h1 span {
        font-size: 3rem;
    }
    .container p {
        font-size: 1rem;
        max-width: 75vw;
    }
}`,
    js: "",
  };
  return <WebEditor data={data} />;
};
export default Page;
