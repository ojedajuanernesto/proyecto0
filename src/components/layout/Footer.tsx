import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Instituto Sur"
                className="h-16 w-auto bg-white rounded-lg p-1"
              />
              <h3 className="text-xl font-bold">Instituto Sur</h3>
            </div>
            <p className="text-blue-200 text-sm">
              Formando generaciones con valores, excelencia académica y compromiso social desde hace más de 25 años.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/nosotros" className="text-blue-200 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/niveles" className="text-blue-200 hover:text-white transition-colors">
                  Niveles Educativos
                </Link>
              </li>
              <li>
                <Link href="/admision" className="text-blue-200 hover:text-white transition-colors">
                  Proceso de Admisión
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-blue-200 hover:text-white transition-colors">
                  Contáctenos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/uniforme" className="text-blue-200 hover:text-white transition-colors">
                  Guía de Uniforme
                </Link>
              </li>
              <li>
                <Link href="/calendario" className="text-blue-200 hover:text-white transition-colors">
                  Calendario Académico
                </Link>
              </li>
              <li>
                <Link href="/descargas" className="text-blue-200 hover:text-white transition-colors">
                  Documentos
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-blue-200 hover:text-white transition-colors">
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-secondary mt-1 flex-shrink-0" />
                <span className="text-blue-200 text-sm">Av. Educación 1234, Zona Sur</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span className="text-blue-200 text-sm">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span className="text-blue-200 text-sm">info@institutosur.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={18} className="text-secondary flex-shrink-0" />
                <span className="text-blue-200 text-sm">Lun - Vie: 7:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-300 text-sm">
            © {new Date().getFullYear()} Instituto Sur. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
