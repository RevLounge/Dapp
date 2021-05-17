import React from "react";
import { Accordion, Grid, GridColumn, GridRow, Label, Message, Segment, Image } from "semantic-ui-react";
import orcid1 from "./images/ORCID-1.png"
import orcid2 from "./images/ORCID-2.png"
import orcid3 from "./images/ORCID-3.png"
import orcid4 from "./images/ORCID-4.png"
import F10001 from "./images/F1000-1.png"
import F10002 from "./images/F1000-2.png"
import F10003 from "./images/F1000-3.png"


const paneles = [
  {
    key: "1",
    title: {
      content: (
        <Label
          color="blue"
          content={"What is RevLounge?"}
          size="big"
        />
      ),
    },
    content: {
      content: (
        <Message info header={"Good question!"} content={<Segment>
          <h3>■ RevLounge is a decentralized portal where you can get tips, reputation tokens (RPT) and NFT rewards for your work as a reviewer doing peer reviews.</h3>
          <h3>■ It is really easy, you just need to register in our platform with your Metamask account and upload your reviews in your profile.</h3>
          <h3>■ And that's it! Let us do the rest, now you can start enjoying our services!</h3>
        </Segment>
        } />
      ),
    },
  },
  {
    key: "2",
    title: {
      content: (
        <Label
          color="blue"
          content={"How can I import a review from ORCID?"}
          size="big"
        />
      ),
    },
    content: {
      content: (
        <Message info header={"Follow this steps:"} content={<Segment>
          <h3>1º: Go to your ORCID personal webpage.</h3>
          <h3>2º: Find your Peer Review Tab.</h3>
          <Image src={orcid1} />
          <h3>
            3º: Display the information of the review you want to import.
          </h3>
          <h3>4º: Press the button "show details".</h3>
          <Image src={orcid2} />
          <h3>5º: Now press the link "OTHER-ID".</h3>
          <Image src={orcid3} />
          <h3>
            6º: Once the new tab is opened, copy the URL and paste it in
            our app.
          </h3>
          <Image src={orcid4} />
        </Segment>
        } />
      ),
    },
  },

  {
    key: "3",
    title: {
      content: (
        <Label
          color="blue"
          content={"How can I import a review from F1000Research?"}
          size="big"
        />
      ),
    },
    content: {
      content: (
        <Message info header={"Follow this steps:"} content={<Segment>
          <h3>1º: Go to the paper's page that your review belongs to.</h3>
          <h3>2º: Click on the "read" button of your review.</h3>
          <Image centered size="medium" src={F10001} />
          <h3>2º: Press the button "Cite this report".</h3>
          <Image centered size="medium" src={F10002} />
          <h3>3º: You will see the URL at the bottom of the popup.</h3>
          <Image centered size="large" src={F10003} />
        </Segment>
        } />
      ),
    },
  },
  {
    key: "4",
    title: {
      content: (
        <Label
          color="blue"
          content={"How can I implement your button in my publishing platform?"}
          size="big"
        />
      ),
    },
    content: {
      content: (
        <Message info header={"Don't worry, it's really easy"} content={<Segment>
          <h3>■ You just need to download our package using 'npm' or 'yarn'.</h3>
          <h3>■ Just tipe this command:</h3>
          <h3>INSERT IMAGE HERE</h3>
          <h3>■ And now you can just need to give us the review ID by calling our package.</h3>
          <h3>■ Just tipe this command:</h3>
          <h3>INSERT COMMAND HERE</h3>
          <h3>■ And that's all! The button will be connected to our server and to the blockchain, we will check that the user
          is already registered in our platform in order to save all the details in the contract and we will manage all the
          operations that are necessary to work.
            </h3>

        </Segment>
        } />
      ),
    },
  },
];

const AccordionExampleShorthand = () => (
  <Grid
    textAlign="center"
    //style={{ height: "100vh" }}

    columns={1}
  >
    <GridRow><h1>FAQs</h1></GridRow>
    <GridColumn centered='true' textAlign='left' width={9} verticalAlign='middle' padded>
      <Segment>
        <Accordion defaultActiveIndex={-1} panels={paneles} />
      </Segment>
    </GridColumn>

  </Grid>
);

export default AccordionExampleShorthand;
