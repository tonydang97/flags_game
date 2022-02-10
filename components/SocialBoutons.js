import { FacebookShareButton, FacebookIcon } from "next-share";
import { PinterestShareButton, PinterestIcon } from "next-share";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { LinkedinShareButton, LinkedinIcon } from "next-share";

export default function SocialBoutons() {
  return (
    <div>
      <FacebookShareButton
        url={"http://localhost:3000"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={"https://github.com/next-share"}
        quote={"coucou"}
        hashtag={"#nextshare"}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={"https://github.com/next-share"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <PinterestShareButton
        url={"https://github.com/next-share"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>
    </div>
  );
}
