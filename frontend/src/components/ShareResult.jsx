import { useState } from "react";

export default function ShareResult({ shareId, aiSummary, auditData }) {
  const [copied, setCopied] = useState(false);
  const [platform, setPlatform] = useState("");

  const shareUrl = `${window.location.origin}/result/${shareId}`;
  const totalSavings = auditData?.totalMonthlySavings || 0;
  const annualSavings = auditData?.totalAnnualSavings || 0;

  const shareText = `I just audited my AI tool spend and found $${totalSavings}/month ($${annualSavings}/year) in potential savings! 🤖💰 Check your stack too:`;

  // Copy link
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share platforms
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,

    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${shareUrl}`
    )}`,
  };

  const handleShare = (p) => {
    setPlatform(p);
    window.open(shareLinks[p], "_blank", "width=600,height=400");
  };

  // Native share (mobile)
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Spend Audit",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-green-600 rounded-full p-2">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316
              -1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632
              -6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367
              2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">Share Your Results</h3>
          <p className="text-gray-400 text-sm">
            Help your team or friends audit their AI spend too
          </p>
        </div>
      </div>

      {/* AI Summary Box */}
      {aiSummary && (
        <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 text-xs font-semibold uppercase 
              tracking-wider">
              AI Summary
            </span>
            <span className="bg-purple-900 text-purple-300 text-xs px-2 py-0.5 
              rounded-full">
              Claude
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{aiSummary}</p>
        </div>
      )}

      {/* Savings Preview Card */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl 
        p-4 flex justify-between items-center">
        <div>
          <p className="text-gray-300 text-xs mb-1">Monthly Savings</p>
          <p className="text-white text-2xl font-bold">${totalSavings}/mo</p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 text-xs mb-1">Annual Savings</p>
          <p className="text-blue-300 text-2xl font-bold">
            ${annualSavings}/yr
          </p>
        </div>
      </div>

      {/* Copy Link */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Your shareable link</p>
        <div className="flex gap-2">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg 
            px-3 py-2 text-sm text-gray-300 focus:outline-none"
          />
          <button
            onClick={copyLink}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition 
            flex items-center gap-2 ${
              copied
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 
                    2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 
                    00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Social Share Buttons */}
      <div>
        <p className="text-sm text-gray-400 mb-3">Share on</p>
        <div className="grid grid-cols-3 gap-3">
          {/* Twitter / X */}
          <button
            onClick={() => handleShare("twitter")}
            className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl 
            border transition ${
              platform === "twitter"
                ? "border-sky-500 bg-sky-900/30"
                : "border-gray-600 hover:border-sky-500 hover:bg-sky-900/20"
            }`}
          >
            <svg
              className="w-5 h-5 text-sky-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17
              l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08
              l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-xs text-gray-400">Twitter / X</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => handleShare("linkedin")}
            className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl 
            border transition ${
              platform === "linkedin"
                ? "border-blue-500 bg-blue-900/30"
                : "border-gray-600 hover:border-blue-500 hover:bg-blue-900/20"
            }`}
          >
            <svg
              className="w-5 h-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037
              -1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414
              v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267
              5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064
              0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771
              C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451
              C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-xs text-gray-400">LinkedIn</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => handleShare("whatsapp")}
            className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl 
            border transition ${
              platform === "whatsapp"
                ? "border-green-500 bg-green-900/30"
                : "border-gray-600 hover:border-green-500 hover:bg-green-900/20"
            }`}
          >
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273
              -.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199
              -.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788
              -1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133
              .298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371
              -.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5
              -.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
              -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213
              3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694
              .625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006
              -1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57
              -.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361
              -.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26
              c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988
              2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885
              9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335
              .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654
              a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893
              -11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-xs text-gray-400">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Native Share (Mobile Only) */}
      {navigator.share && (
        <button
          onClick={nativeShare}
          className="w-full flex items-center justify-center gap-2 border 
          border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white 
          py-3 rounded-xl text-sm font-medium transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 
              0L8 8m4-4v12"
            />
          </svg>
          Share via Device
        </button>
      )}

      {/* Footer note */}
      <p className="text-xs text-gray-500 text-center">
        Personal details are never included in shared links
      </p>
    </div>
  );
}