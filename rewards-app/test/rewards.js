const { assert } = require("chai");

const Rewards = artifacts.require("Rewards.sol");
const ReputationToken = artifacts.require("ReputationToken.sol");
const AwardsToken = artifacts.require("AwardsToken.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Rewards", ([deployer, author, reviewer, tipper, reviewer2]) => {
  let rewards, reputationToken, awardsToken;

  before(async () => {
    reputationToken = await ReputationToken.new();
    awardsToken = await AwardsToken.new()
    rewards = await Rewards.new(reputationToken.address, awardsToken.address);
  });

  describe("deployment", async () => {
    it("deploys succesfully", async () => {
      const address = await rewards.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });
  describe("papers", async () => {
    let result, paperCount;

    before(async () => {
      result = await rewards.createPaper("This is my first paper", {
        from: author,
      });
      paperCount = await rewards.getPaperCount();
      paperCount = paperCount.toNumber();
    });

    it("creates papers", async () => {
      // SUCESS
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), paperCount, "id is correct");
      assert.equal(event.title, "This is my first paper", "title is correct");
      assert.equal(event.tipAmount, "0", "tip amount is correct");
      assert.equal(event.author, author, "author is correct");

      // FAILURE: Paper must have title
      await rewards.createPaper("", { from: author }).should.be.rejected;
    });

    it("read first paper", async () => {
      const paper = await rewards.papers(paperCount - 1);
      const reviewerCount = await rewards.getPaperReviewerCount(paperCount - 1);
      assert.equal(paper.id.toNumber(), paperCount, "id is correct");
      assert.equal(paper.title, "This is my first paper", "title is correct");
      assert.equal(paper.tipAmount, "0", "tip amount is correct");
      assert.equal(paper.author, author, "author is correct");
      assert.equal(reviewerCount.toNumber(), "0", "reviewer list is empty");
    });

    it("add reviewer", async () => {
      paper = await rewards.addReviewer(paperCount - 1, reviewer, "LGTM");
      const reviewerCount = await rewards.getPaperReviewerCount(paperCount - 1);
      assert.equal(reviewerCount.toNumber(), "1", "have 1 reviewer");
    });

    it("get all reviewers", async () => {
      paper = await rewards.addReviewer(paperCount - 1, reviewer2, "LGTM" );

      const reviewers = await rewards.getReviewers();
      assert.equal(reviewers.length, "2", "have 2 reviewers");
    });

    it("get all reviewers of a paper", async () => {
      const paperReviewers = await rewards.getPaperReviewers(paperCount - 1);
      assert.equal(paperReviewers.length, "2", "the paper have 2 reviewers");
    });

    it("get the number of papers", async () => {
      const papersCount = await rewards.getPaperCount();
      assert.equal(papersCount, "1", "have 1 paper");
    });

    it("get the number of reviewers of a paper", async () => {
      const paperReviewersCount = await rewards.getPaperReviewerCount(paperCount - 1);
      assert.equal(paperReviewersCount, "2", "the paper have 2 reviewers");
    });

    it("allows users to tip reviewers", async () => {
      // Track the reviewer balance before purchase
      let oldReviewerBalance;
      oldReviewerBalance = await web3.eth.getBalance(reviewer);
      oldReviewerBalance = new web3.utils.BN(oldReviewerBalance);

      result = await rewards.tipReviewer(paperCount - 1, reviewer, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      });

      // SUCESS
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), "0", "id is correct");
      assert.equal(event.title, "This is my first paper", "title is correct");
      assert.equal(
        event.tipAmount,
        "1000000000000000000",
        "tip amount is correct"
      );
      assert.equal(event.author, author, "author is correct");
      assert.equal(event.reviewer, reviewer, "reviewer is correct");

      // Check that reviewer received funds
      let newReviewerBalance;
      newReviewerBalance = await web3.eth.getBalance(reviewer);
      newReviewerBalance = new web3.utils.BN(newReviewerBalance);

      let tipAmount;
      tipAmount = web3.utils.toWei("1", "Ether");
      tipAmount = new web3.utils.BN(tipAmount);

      const exepectedBalance = oldReviewerBalance.add(tipAmount);

      assert.equal(newReviewerBalance.toString(), exepectedBalance.toString());

      // FAILURE: Tries to tip a paper that does not exist
      await rewards.tipReviewer(99, {
        from: tipper,
        reviewer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });
  });

  describe("reputation", async () => {
    let paperCount;

    before(async () => {
      paperCount = await rewards.getPaperCount();
      paperCount = paperCount.toNumber();
    });

    //giveReputation
    it("give reputation to reviewer", async () => {
      await rewards.giveReputation(paperCount - 1, reviewer, {
        from: tipper,
      });
      
      const reputation = await rewards.getReputation(reviewer);
      assert.equal("1", reputation, "the reviewer have reputation");
    });

    //undoGiveReputation
    it("undo give reputation to reviewer", async () => {
      await rewards.undoGiveReputation(paperCount - 1, reviewer, {
        from: tipper,
      });
      
      const reputation = await rewards.getReputation(reviewer);
      assert.equal("0", reputation, "the reviewer have reputation");
    });
  });

  describe("award", async () => {
    let paperCount;

    before(async () => {
      paperCount = await rewards.getPaperCount();
      paperCount = paperCount.toNumber();
    });

    //giveAward
    it("give award to reviewer", async () => {
      await rewards.giveAward(paperCount - 1, reviewer, 0, {
        from: tipper,
      });
      
      const award = await rewards.getAward(reviewer, 0);
       assert.equal(award.id, paperCount - 1, "paper is correct");
       assert.equal(award.reviewer, reviewer, "reviewer is correct");
       assert.equal(award.sender, tipper, "tipper is correct");
       assert.equal(award.awardId, 0, "award id is correct");
    });
  });
});
