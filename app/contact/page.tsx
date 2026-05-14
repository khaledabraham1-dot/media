import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez la rédaction de La Ligne Rouge.",
};

export default function ContactPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-heading text-[3rem] max-md:text-[2.2rem] font-extrabold leading-[1.1] text-navy mb-4">
          Contact
        </h1>
        <p className="font-serif text-[1.15rem] text-text2 mb-12">
          Une question, une suggestion, un partenariat ? N&apos;hésitez pas à nous contacter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-start gap-4 p-6 bg-bg rounded-lg border border-border">
            <Mail className="text-red shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-navy mb-1">Email</h3>
              <a href="mailto:contact@lignerouge.media" className="text-text2 hover:text-red transition-colors">
                contact@lignerouge.media
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-bg rounded-lg border border-border">
            <MapPin className="text-red shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-navy mb-1">Adresse</h3>
              <p className="text-text2">Dakar, Sénégal</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
