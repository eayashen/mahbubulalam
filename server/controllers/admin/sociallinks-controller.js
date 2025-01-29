const SocialLinks = require("../../models/SocialLinks");

const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLinks.findOne({});
    res.status(200).json({ success: true, data: socialLinks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const upsertSocialLinks = async (req, res) => {
  try {
    const {
      scholar,
      orcid,
      publons,
      linkedin,
      twitter,
      instagram,
      facebook,
      scholarVisible,
      orcidVisible,
      publonsVisible,
      linkedinVisible,
      twitterVisible,
      instagramVisible,
      facebookVisible,
    } = req.body;

    const updatedSocialLinks = await SocialLinks.findOneAndUpdate(
      {},
      {
        $set: {
          scholar,
          orcid,
          publons,
          linkedin,
          twitter,
          instagram,
          facebook,
          scholarVisible,
          orcidVisible,
          publonsVisible,
          linkedinVisible,
          twitterVisible,
          instagramVisible,
          facebookVisible,
        },
      },
      { new: true, upsert: true }
    );
    res
      .status(200)
      .json({
        message: "Social links updated successfully",
        data: updatedSocialLinks,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getSocialLinks,
  upsertSocialLinks,
};
