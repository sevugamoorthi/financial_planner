import { FinancialData } from "../types";

// This function now generates advice locally using a rule-based system,
// replacing the paid Gemini API. It returns a promise to simulate an async
// operation, allowing the UI's loading state to function smoothly.
export const getFinancialAdvice = (data: FinancialData, finalValue: number): Promise<string> => {
  return new Promise(resolve => {
    // Simulate a short delay for a better user experience
    setTimeout(() => {
      const { monthlyContribution, interestRate, retirementAge, currentAge } = data;
      const timeToRetirement = retirementAge - currentAge;

      let outlook = '';
      if (finalValue > 10000000) { // 1 Crore
        outlook = "Your current plan puts you on an excellent track for a comfortable retirement. This is a very strong financial position.";
      } else if (finalValue > 5000000) { // 50 Lakhs
        outlook = "You've built a solid foundation for your retirement. With some strategic adjustments, you can significantly enhance your final nest egg.";
      } else {
        outlook = "This is a good starting point, but your plan may need significant adjustments to ensure a comfortable retirement. It's crucial to take action now.";
      }

      const recommendations: string[] = [];
      if (monthlyContribution < 20000) {
        recommendations.push(
          "**Increase Your Monthly Contribution:** Even a small increase in your monthly savings can have a massive impact over the long term due to the power of compounding. Aim to increase your contribution rate gradually each year."
        );
      }
      if (interestRate < 8) {
        recommendations.push(
          `**Explore Higher-Return Investments:** An expected return of ${interestRate}% is quite conservative. Consider diversifying into investments with higher potential returns, such as equity mutual funds through a Systematic Investment Plan (SIP), especially if you have a long time horizon.`
        );
      }
      if (timeToRetirement > 20) {
         recommendations.push(
          `**Leverage Your Time Horizon:** With over ${timeToRetirement} years until retirement, compounding is your most powerful ally. Stay invested and be consistent to maximize its benefits.`
        );
      }
      recommendations.push("**Review Your Plan Annually:** Life changes, and so should your financial plan. Revisit your goals, contributions, and investments at least once a year to stay on track.");
      recommendations.push("**Consider Inflation:** The advice provided here doesn't account for inflation, which will reduce the future value of your savings. Factor in an inflation rate (typically 5-6% in India) when setting your retirement goals.");


      const risks = [
        "**Inflation:** The rising cost of living can erode the purchasing power of your savings over time. It's essential to aim for returns that significantly outpace inflation.",
        "**Market Volatility:** Investments with higher returns, like equities, come with short-term volatility. It's important to have a long-term perspective and not panic-sell during downturns."
      ];

      // Format the advice into a markdown string.
      // The custom markdown parser in AdviceCard.tsx will format this.
      const advice = `
**Overall Outlook**
${outlook}

**Key Recommendations**
${recommendations.map(r => `- ${r}`).join('\n')}

**Potential Risks**
${risks.map(r => `- ${r}`).join('\n')}

**Next Steps**
Stay disciplined with your savings and investments. The consistent effort you put in today will build a secure financial future.
      `;
      resolve(advice.trim());
    }, 1200); // 1.2 second delay
  });
};
