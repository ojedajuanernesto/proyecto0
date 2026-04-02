import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Target, Eye, Heart, Users, BookOpen, Award } from "lucide-react";

export default function Nosotros() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sobre Nosotros</h1>
          <p className="text-blue-200 text-lg">Conoce la historia y los valores del Instituto Sur</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <img
                src="/images/frente.webp"
                alt="Fachada del Instituto Sur"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4">
                El Instituto Sur fue fundado en el año 2000 con la misión de brindar educación de calidad en la zona sur de nuestra ciudad. Desde entonces, hemos formado generaciones de estudiantes exitosos que han contribuido positivamente a la sociedad.
              </p>
              <p className="text-gray-600 mb-4">
                A lo largo de más de 25 años, hemos evolucionado y adaptándonos a las necesidades educativas de cada época, siempre manteniendo nuestro compromiso con la excelencia académica y la formación en valores.
              </p>
              <p className="text-gray-600">
                Hoy en día, el Instituto Sur cuenta con modernas instalaciones, un equipo docente altamente calificado y una comunidad de más de 1500 estudiantes y sus familias que confían en nosotros para su formación educativa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center" hover>
              <Target className="w-14 h-14 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">Misión</h3>
              <p className="text-gray-600">
                Brindar educación integral de calidad, formando estudiantes críticos, creativos y éticos, preparados para enfrentar los desafíos del mundo actual.
              </p>
            </Card>
            
            <Card className="p-8 text-center" hover>
              <Eye className="w-14 h-14 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">Visión</h3>
              <p className="text-gray-600">
                Ser la institución educativa líder en la zona sur, reconocida por la excelencia académica, la innovación pedagógica y la formación integral de sus estudiantes.
              </p>
            </Card>
            
            <Card className="p-8 text-center" hover>
              <Heart className="w-14 h-14 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">Valores</h3>
              <p className="text-gray-600">
                Honestidad, respeto, responsabilidad, solidaridad, excelencia, innovación y compromiso social guían cada aspecto de nuestra labor educativa.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Nuestro Equipo</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <Card className="text-center" hover>
              <div className="p-6">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary">Dirección General</h3>
                <p className="text-gray-600 text-sm">Liderazgo y Gestión</p>
              </div>
            </Card>
            
            <Card className="text-center" hover>
              <div className="p-6">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary">Coordinación Académica</h3>
                <p className="text-gray-600 text-sm">Calidad Educativa</p>
              </div>
            </Card>
            
            <Card className="text-center" hover>
              <div className="p-6">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary">Docentes</h3>
                <p className="text-gray-600 text-sm">120+ Profesionales</p>
              </div>
            </Card>
            
            <Card className="text-center" hover>
              <div className="p-6">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary">Orientación</h3>
                <p className="text-gray-600 text-sm">Bienestar Estudiantil</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Quieres conocer más?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Agenda una visita a nuestras instalaciones o contáctanos para obtener más información sobre nuestro proyecto educativo.
          </p>
          <Button href="/contacto" variant="outline">Contáctanos</Button>
        </div>
      </section>
    </div>
  );
}
