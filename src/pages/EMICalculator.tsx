import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, MessageCircle } from "lucide-react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const sendToWhatsApp = () => {
    const message = `Hi! I used your EMI Calculator with these details:
    
Loan Amount: ₹${loanAmount.toLocaleString("en-IN")}
Interest Rate: ${interestRate}%
Tenure: ${tenure} years

Monthly EMI: ₹${Math.round(emi).toLocaleString("en-IN")}
Total Interest: ₹${Math.round(totalInterest).toLocaleString("en-IN")}
Total Payment: ₹${Math.round(totalPayment).toLocaleString("en-IN")}

I'd like to get a detailed quote for my construction project.`;

    const phoneNumber = "916374507535";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
              <Calculator className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Construction Loan <span className="text-primary">EMI Calculator</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Calculate your monthly EMI for construction loans and plan your budget effectively
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-2xl shadow-medium space-y-8"
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Enter Loan Details
              </h2>

              <div className="space-y-6">
                {/* Loan Amount */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-40 text-right"
                    />
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    min={100000}
                    max={10000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      step="0.1"
                      className="w-40 text-right"
                    />
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={5}
                    max={15}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>5%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-40 text-right"
                    />
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={(value) => setTenure(value[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-card p-8 rounded-2xl shadow-medium">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  EMI Breakdown
                </h2>

                <div className="space-y-6">
                  {/* Monthly EMI */}
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
                    <p className="text-4xl font-heading font-bold text-primary">
                      ₹{Math.round(emi).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Total Interest */}
                  <div className="bg-background-secondary p-6 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Total Interest Payable</p>
                    <p className="text-2xl font-heading font-bold text-foreground">
                      ₹{Math.round(totalInterest).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Total Payment */}
                  <div className="bg-background-secondary p-6 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Total Payment</p>
                    <p className="text-2xl font-heading font-bold text-foreground">
                      ₹{Math.round(totalPayment).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Principal Amount:</span>
                      <span className="font-medium">
                        ₹{loanAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Interest Rate:</span>
                      <span className="font-medium">{interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Loan Tenure:</span>
                      <span className="font-medium">{tenure} years ({tenure * 12} months)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-card p-8 rounded-2xl shadow-medium text-center">
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Get a Detailed Quote
                </h3>
                <p className="text-muted-foreground mb-6">
                  Send your EMI calculation to us on WhatsApp and get a personalized construction quote
                </p>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={sendToWhatsApp}
                  className="w-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send to WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
              Understanding Your <span className="text-primary">Construction Loan EMI</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                An EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month, so that over a specified number of years, the loan is paid off in full.
              </p>
              <p>
                For construction loans, the EMI helps you plan your finances better by giving you a clear picture of your monthly obligations. Our calculator uses the standard EMI formula to provide accurate calculations based on your loan amount, interest rate, and tenure.
              </p>
              <p>
                Use this calculator as a planning tool. For actual loan terms and conditions, please consult with your financial institution or contact us for personalized assistance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EMICalculator;
