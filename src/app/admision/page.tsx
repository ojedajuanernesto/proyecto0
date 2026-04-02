import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle, Calendar, FileText, Users, Phone, Mail } from "lucide-react";

const requisitos = [
  { title: "Documentos del Alumno", items: ["Certificado de nacimiento (copia notariada)", "Certificado de estudios o constancia de promoción", "Fotos tamaño carnet (4 unidades)", "Copia de cédula de identidad"] },
  { title: "Documentos de los Padres", items: ["Copia de cédula de identidad", "Comprobante de domicilio reciente", "Constancia de trabajo o ingresos"] },
  { title: "Proceso de Admisión", items: ["Entrega de documentación completa", "Evaluación de ingreso", "Entrevista con padres de familia", "Publicación de resultados"] },
];

export default function Admision() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Admisión 2026</h1>
          <p className="text-blue-200 text-lg">Únete a nuestra comunidad educativa</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Proceso de Admisión</h2>
              <p className="text-gray-600">
                Siga los pasos a continuación para completar el proceso de admisión de su hijo/a en el Instituto Sur.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <Card className="p-6 text-center relative" hover>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">1</div>
                <FileText className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">Documentación</h3>
                <p className="text-gray-600 text-sm">Entregue todos los documentos requeridos</p>
              </Card>
              
              <Card className="p-6 text-center relative" hover>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">2</div>
                <Users className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">Evaluación</h3>
                <p className="text-gray-600 text-sm">Su hijo/a realizará una evaluación de ingreso</p>
              </Card>
              
              <Card className="p-6 text-center relative" hover>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">3</div>
                <Phone className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">Entrevista</h3>
                <p className="text-gray-600 text-sm">Entrevista con los padres de familia</p>
              </Card>
              
              <Card className="p-6 text-center relative" hover>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">4</div>
                <CheckCircle className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">Confirmación</h3>
                <p className="text-gray-600 text-sm">Reciba la confirmación de admisión</p>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {requisitos.map((req, index) => (
                <Card key={index} className="p-6" hover>
                  <h3 className="text-xl font-bold text-primary mb-4">{req.title}</h3>
                  <ul className="space-y-3">
                    {req.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="p-8" hover>
              <Calendar className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-4">Fechas Importantes</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Pre-inscripciones</span>
                  <span className="font-semibold text-primary">1 Feb - 31 Mar 2026</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Evaluaciones de ingreso</span>
                  <span className="font-semibold text-primary">15 - 30 Abr 2026</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Publicación de resultados</span>
                  <span className="font-semibold text-primary">15 May 2026</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Inicio de clases</span>
                  <span className="font-semibold text-primary">1 Mar 2026</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8" hover>
              <Mail className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-4">Costos y Modalidades</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Matrícula (anual)</span>
                  <span className="font-semibold text-primary">Consultar en secretaría</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Pensión mensual</span>
                  <span className="font-semibold text-primary">Consultar en secretaría</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-700">Formas de pago</span>
                  <span className="font-semibold text-primary">Efectivo, transferencia, cheques</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Descuentos</span>
                  <span className="font-semibold text-primary">Hermanos, pronto pago</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Tienes preguntas?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de admisiones está disponible para responder todas sus consultas y ayudarle en el proceso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contacto" variant="outline">Enviar Consulta</Button>
            <Button href="/descargas" variant="primary">Descargar Formulario</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
