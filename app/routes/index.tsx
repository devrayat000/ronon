import {
  IconBraces,
  IconCertificate,
  IconDeviceMobileMessage,
  IconMessageCircle,
  IconUserCheck,
  IconZoomQuestion,
} from "@tabler/icons";
import type { HeadersFunction, LinksFunction } from "@remix-run/node";

import GotoSection from "~/components/home/goto";
import HeroSection from "~/components/home/hero";
import FeaturesGrid from "~/components/home/services";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: "/assets/ronon_illustration.svg",
      as: "image",
      type: "image/png",
    },
  ];
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
  };
};

export default function Index() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid
        title="Learn, Teach, Enjoy, anytime."
        data={[
          {
            title: "Problem Solving",
            description:
              "Get your physics, Chemistry, Math, Biology related problems solved by our expert doubt solver panel.",
            icon: IconBraces,
          },
          {
            title: "Discussion",
            description: "Join the community discussion on any academic topic.",
            icon: IconMessageCircle,
          },
          {
            title: "Live Chat",
            description:
              "Chat with our teacher panel or fellow students any time. ",
            icon: IconDeviceMobileMessage,
          },
          {
            title: "QnA Archive",
            description:
              "Search and find answer to your desired question already solved or collected by us.",
            icon: IconZoomQuestion,
          },
          {
            title: "Quizzes and Exams",
            description:
              "Take part in interesting quizzes and exams and win exciting prizes.",
            icon: IconCertificate,
          },
          {
            icon: IconUserCheck,
            title: "24/7 Support",
            description:
              "Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail",
          },
        ]}
      />

      <GotoSection />
    </>
  );
}
