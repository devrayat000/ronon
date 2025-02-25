import { Box, Container, Text, Title } from "@mantine/core";
import { type MetaFunction } from "@remix-run/node";

export const headers = () => {
  const a = new Date(),
    b = new Date();
  b.setMonth(a.getMonth() + 1);

  const c = b.getMilliseconds() - a.getMilliseconds(),
    age = c / 1000;

  return {
    "Cache-Control": `public, max-age=60, s-maxage=${age}, state-while-revalidate=${age}`,
  };
};

export const meta: MetaFunction = () => {
  return {
    title: "Privacy and Policy - Ronon",
  };
};

export default function PrivacyPolicy() {
  return (
    <Container>
      <Title order={1} align="center">
        Privacy Policy
      </Title>
      <Box component="section" mt="xl">
        <Text component="p">
          Kindly read this privacy policy thoroughly so that you may learn more
          about the ways in which we use and protect your personal information.
          Ronon is committed to the highest ethical standards and is sensitive
          to the perspective that Ronon would be dealing with data and
          information that may be personal in nature. By using this website and
          providing your personal information, you agree to the terms of Ronon`s
          online privacy policy and to its processing of such personal
          information for the purposes explained in this policy. As part of our
          normal operations we collect, and in some cases, disclose information
          about you. By registering on the site or by subscribing to a service
          and providing your contact details (telephone, email, mobile number
          etc), you agree that this action constitutes a consent, for the
          purposes of the telemarketing laws, to receive information about
          products and services (“Services”) from Ronon. You hereby agree to our
          contacting you pursuant to the business relationship established using
          the information you provide to Ronon. We advise you to read this
          privacy policy regarding the collection, use, and disclosure of or
          your information. If you are not comfortable with any of the terms or
          policies described in this Privacy Policy, you must discontinue use of
          our website.
        </Text>

        <Text component="p">
          <b>Privacy:</b> Your privacy is of utmost importance to us. We follow
          stringent procedures to protect the security of the information and or
          data stored on our website. The information that you have shared on
          our website is stored in secure server with encryption and can be
          accessed only for official purposes. Any of our employees who violate
          our privacy and or security policies related to user’s data is subject
          to disciplinary action, including possible termination and civil
          and/or criminal prosecution.
        </Text>

        <Text component="p">
          <b>Registration:</b> On signing up on Ronon Website, you are required
          to provide us with certain basic mandatory information inter-alia
          including your e-mail id, name, gender, password etc. Once the
          registration is completed, the said e-mail, password, roll,
          registration etc. or a certain combination can be used to access your
          account every time you visit our website.
        </Text>

        <Text component="p">
          <b>Information we collect from you:</b> Ronon collects information
          that is either anonymous or personally identifiable. When you visit
          our site to read or download any information, we collect and store the
          name of the domain from which you access the internet, the date and
          time you access our site and the internet address of the website from
          which you link to our site, the search terms you enter into our search
          utility, browser software and internet service provider you use and
          any other relevant information, in order to improve security, analyze
          trends and administer the site. Our analytic tools may also capture
          anonymous information such as your demographic and geographic
          information, with a view to assist us in improving customer
          experience. We use this information to evaluate traffic patterns on
          our site, so that we can make it more useful to our visitors. The
          information we learn from you helps us personalize and continually
          improve your experience at our website. We do not voluntarily make
          this information available to third parties, nor do we use it for any
          other purpose, except as set out herein. Set out below are the types
          of information we gather:
        </Text>

        <Text component="p">
          <b>Information You Provide Us:</b> We receive and store any
          information you enter on our Website or give us in any other way,
          including but not limited to name, profile picture, gender, email id,
          telephone number, mobile number, course details, grade etc. in case
          you are a student or in the event you are registered as a tutor, the
          information that we collect would inter-alia include your name,
          school, school year, academic subject, tutoring experience, CGPA,
          listed interests, tutoring subjects, additional information on your
          tutoring areas of expertise etc. You can choose not to provide certain
          information, but in such event, you may not be able to take advantage
          of many of our features. We use the information that you provide for
          such purposes as responding to your requests, customizing future
          shopping for you, improving our website, and communicating with you.
          Customer needs to fill all the mandatory information for placing an
          order with Ronon. Ronon may, as required or permitted by law or while
          performing our regulatory responsibilities, provide personally
          identifiable information, such as your name and address, or any other
          information that you provide, without your permission to persons or
          organizations that request this information. Ronon has the right to
          share limited details regarding the tutor and the student subscriber
          with each other as per the requirements. However, at no instance, the
          tutor or the student subscriber are allowed to share personal
          information of any kind with each other during tutoring or otherwise.
          Any such act would be considered as a violation of this policy and the
          accounts and services availed by respective parties will be suspended
          / cancelled at the sole discretion of Ronon. E-mail Communications:
          Registration to Ronon Services shall entitle us to send you
          promotional and transactional emails from Ronon. Subscription to our
          newsletters entitles us to send you periodic newsletters and
          promotional emails. If you do not want to receive e-mails or any other
          communication from us, you may unsubscribe by clicking on
          ‘unsubscribe’ at the footer of any email received from Ronon. SMS and
          Voice Communications: Upon subscribing to any services on our Website,
          we shall be entitled to use your registered mobile number on the
          Website to send transaction related SMS/Voice calls to you,
          irrespective of DND services being activated on your mobile. We may
          occasionally send promotional SMS/Voice Calls to your registered
          mobile number. Automatic Information: We receive and store certain
          types of information whenever you interact with us. For example, like
          many websites, we use “cookies,” and we obtain certain types of
          information when your Web browser accesses our website or
          advertisements and other content served by or on behalf of Ronon & .
          on other websites.
        </Text>

        <Text component="p">
          <b>Payment Information:</b> We do not store any Debit/Credit card,
          Internet banking details or any other information related to these on
          our website. On clicking the option Pay Now, you will be redirected to
          either Secure Payment Gateway or Bank’s Net Banking website for
          completing the transaction. You will then be required to enter your
          relevant card details or net banking details on the page to complete
          the transaction. On successful completion of the transaction, you will
          be redirected to our website. It is to be noted that we will not be
          storing any bank related information on our records and none of our
          staffs will hold or be exposed to this information.
        </Text>

        <Text component="p">
          <b>Cookies:</b> Some of our applications use cookies. The cookies are
          files which will identify your computer or your “session” to our
          server as a unique user when you visit pages on our website. Once you
          exit our site, these “session cookies” expire (either when you close
          your browser or later). We also use “tracking cookies” to collect
          information regarding website usage (e.g., the number of visitors to
          different sections of our website) to analyze traffic to our website
          and improve user experience. We use cookies only to ensure your
          improved shopping experience and not for obtaining or using any other
          personally identifiable information about you. You may configure your
          browser to prevent cookies from being set on your computer. If you
          reject cookies, you may still use the site, but your ability to use
          some features of the website may be limited and you may not be able to
          use certain features of the website.
        </Text>

        <Text component="p">
          <b>Social Media Links/Widgets:</b> The Website may include certain
          social media features, such as the ‘Facebook like’ button and widgets
          such as the ‘Share this button’ or interactive mini programs that run
          on the Website. On using these features, the IP addresses of the user
          may be collected depending on the page that is being visited and the
          Website may set appropriate cookie to enable the feature to function
          properly. The social media features and widgets are either hosted by a
          third party or hosted directly on the Website.
        </Text>

        <Text component="p">
          <b>Server Logs:</b> In order to ensure easy and comfortable surfing on
          our website, each time you visit our website, the server collects
          certain statistical information. These statistics are only used to
          provide us information in relation to the type of user using our
          website by maintaining history of page viewed and at no point they
          identify the personal details of the user. We may make use of this
          data to understand as to how our website is being used.
        </Text>

        <Text component="p">
          <b>Security:</b> We have in place appropriate technical and security
          measures to prevent unauthorized or unlawful access to or accidental
          loss of or destruction or damage to your information. When we collect
          data through our website, we collect your personal details on a
          secured server. The payment details are entered on the Payment
          Gateway’s or Bank’s page on a secured SSL. The data is transferred
          between Bank and gateways in an encrypted manner. Ronon utilizes
          various information security measures such as firewalls, encrypted
          data transmission and other security techniques to protect your
          personal data. However, please keep in mind that transmitting
          information via the internet is never completely secure and thus any
          information submitted may be intercepted, collected, used, or
          disclosed by others. As per our security procedures we may
          occasionally request proof of identity before we disclose personal
          information to you. You are responsible for protecting against
          unauthorized access to your password and to your computer. We are not
          responsible for the security or confidentiality of communications you
          send to us through the internet using email messages.
        </Text>
      </Box>
    </Container>
  );
}
