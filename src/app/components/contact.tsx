"use client";

import type React from "react";

import { useState } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export function Contact() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Etapa 1: Dados Pessoais
    fullName: "",
    socialName: "",
    gender: "",
    birthDate: "",
    cpf: "",
    rg: "",
    email: "",
    phone: "",

    // Etapa 2: Endereço
    cep: "",
    address: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",

    // Etapa 3: Autodeclaração e PcD
    selfDeclaration: "",
    isPcd: "",
    pcdType: "",
    pcdDescription: "",

    // Etapa 4: Acessibilidade
    needsAccessibility: "",

    // Etapa 5: Programa Social
    socialProgram: "",

    // Etapa 6: Disponibilidade
    availability: "",

    // Etapa 7: Termos
    confirmTruth: false,
    authorizeData: false,
    attendanceAgreement: false,

    // Etapa 8: Como conheceu
    discovery: "",
    discoveryOther: "",
  });

  // Formatadores
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  // Validações por etapa
  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName &&
          formData.gender &&
          formData.birthDate &&
          formData.cpf &&
          formData.rg &&
          formData.email &&
          formData.phone
        );
      case 2:
        return (
          formData.cep &&
          formData.address &&
          formData.number &&
          formData.neighborhood &&
          formData.city &&
          formData.state
        );
      case 3:
        return (
          formData.selfDeclaration &&
          formData.isPcd &&
          (formData.isPcd === "nao" ||
            (formData.pcdType && formData.pcdDescription))
        );
      case 4:
        return formData.needsAccessibility !== "";
      case 5:
        return formData.socialProgram !== "";
      case 6:
        return formData.availability !== "";
      case 7:
        return (
          formData.confirmTruth &&
          formData.authorizeData &&
          formData.attendanceAgreement
        );
      case 8:
        return (
          formData.discovery &&
          (formData.discovery !== "outros" || formData.discoveryOther)
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid(8)) {
      setIsSubmitting(true);

      try {
        // Formata os dados para enviar
        const submissionData = {
          name: formData.fullName,
          socialName: formData.socialName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          birthDate: formData.birthDate,
          cpf: formData.cpf,
          rg: formData.rg,
          address: `${formData.address}, ${formData.number}${
            formData.complement ? ` - ${formData.complement}` : ""
          } - ${formData.neighborhood}, ${formData.city}/${
            formData.state
          } - CEP: ${formData.cep}`,
          selfDeclaration: formData.selfDeclaration,
          isPcd: formData.isPcd,
          pcdType: formData.pcdType,
          pcdDescription: formData.pcdDescription,
          needsAccessibility: formData.needsAccessibility,
          socialProgram: formData.socialProgram,
          availability: formData.availability,
          discovery:
            formData.discovery === "Outro"
              ? formData.discoveryOther
              : formData.discovery,
          message: `Inscrição completa recebida. Termos aceitos: ${
            formData.confirmTruth ? "Sim" : "Não"
          }, ${formData.authorizeData ? "Sim" : "Não"}, ${
            formData.attendanceAgreement ? "Sim" : "Não"
          }`,
        };

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (response.ok) {
          console.log("Formulário enviado com sucesso!");
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setStep(1);
            setFormData({
              fullName: "",
              socialName: "",
              gender: "",
              birthDate: "",
              cpf: "",
              rg: "",
              email: "",
              phone: "",
              cep: "",
              address: "",
              number: "",
              neighborhood: "",
              complement: "",
              city: "",
              state: "",
              selfDeclaration: "",
              isPcd: "",
              pcdType: "",
              pcdDescription: "",
              needsAccessibility: "",
              socialProgram: "",
              availability: "",
              confirmTruth: false,
              authorizeData: false,
              attendanceAgreement: false,
              discovery: "",
              discoveryOther: "",
            });
          }, 3000);
        } else {
          console.error("Erro ao enviar formulário");
          alert("Erro ao enviar formulário. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        alert("Erro ao enviar formulário. Por favor, tente novamente.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <section
        id="contato"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border-2 border-primary/20">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Inscrição Enviada com Sucesso!
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Recebemos sua inscrição e entraremos em contato em breve. Fique
              atento ao seu e-mail e WhatsApp!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contato"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-primary/5"
    >
      <div className="container mx-auto max-w-7xl mt-4">
        <div className="max-w-3xl mx-auto text-center mb-8 ">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Pronto Para <span className="text-primary">Começar?</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Preencha o formulário e garanta sua vaga nos próximos cursos
            gratuitos!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Formulário Principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-blue-600 p-4">
                <h3 className="text-xl font-bold text-white mb-1">
                  Formulário de Inscrição
                </h3>
                <p className="text-sm text-blue-50">
                  Etapa {step} de 8 -{" "}
                  {
                    [
                      "Dados Pessoais",
                      "Endereço",
                      "Autodeclaração",
                      "Acessibilidade",
                      "Programa Social",
                      "Disponibilidade",
                      "Termos",
                      "Finalização",
                    ][step - 1]
                  }
                </p>

                {/* Barra de Progresso */}
                <div className="mt-3 bg-white/20 rounded-full h-1.5">
                  <div
                    className="bg-white rounded-full h-1.5 transition-all duration-300"
                    style={{ width: `${(step / 8) * 100}%` }}
                  />
                </div>
              </div>

              {/* Corpo do Formulário */}
              <form onSubmit={handleSubmit} className="p-5">
                <div className="space-y-4">
                  {/* ETAPA 1: Dados Pessoais */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Nome Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="Digite seu nome completo"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Nome Social{" "}
                          <span className="text-gray-400 text-xs">
                            (opcional)
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="Como prefere ser chamado(a)"
                          value={formData.socialName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              socialName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Gênero <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                            value={formData.gender}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                gender: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecione</option>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                            <option value="nao-binario">Não-binário</option>
                            <option value="outro">Outro</option>
                            <option value="prefiro-nao-informar">
                              Prefiro não informar
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Data de Nascimento{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.birthDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                birthDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            CPF <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cpf: formatCPF(e.target.value),
                              })
                            }
                            maxLength={14}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            RG <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="00.000.000-0"
                            value={formData.rg}
                            onChange={(e) =>
                              setFormData({ ...formData, rg: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            E-mail <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Telefone / WhatsApp{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: formatPhone(e.target.value),
                              })
                            }
                            maxLength={15}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ETAPA 2: Endereço */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          CEP <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="00000-000"
                          value={formData.cep}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cep: formatCEP(e.target.value),
                            })
                          }
                          maxLength={9}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Endereço <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Rua, Avenida..."
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Número <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Nº"
                            value={formData.number}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                number: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Bairro <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Bairro"
                            value={formData.neighborhood}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                neighborhood: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Complemento{" "}
                            <span className="text-gray-400 text-xs">
                              (opcional)
                            </span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Apto, bloco..."
                            value={formData.complement}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                complement: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Cidade <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Cidade"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Estado <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                            value={formData.state}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                state: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ETAPA 3: Autodeclaração e PcD */}
                  {step === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Como você se autodeclara?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                          value={formData.selfDeclaration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              selfDeclaration: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione</option>
                          <option value="branco">Branco(a)</option>
                          <option value="preto">Preto(a)</option>
                          <option value="pardo">Pardo(a)</option>
                          <option value="amarelo">Amarelo(a)</option>
                          <option value="indigena">Indígena</option>
                          <option value="prefiro-nao-informar">
                            Prefiro não informar
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Você é pessoa com deficiência (PcD)?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                          value={formData.isPcd}
                          onChange={(e) =>
                            setFormData({ ...formData, isPcd: e.target.value })
                          }
                        >
                          <option value="">Selecione</option>
                          <option value="sim">Sim</option>
                          <option value="nao">Não</option>
                        </select>
                      </div>

                      {formData.isPcd === "sim" && (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Tipo de Deficiência{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                              value={formData.pcdType}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  pcdType: e.target.value,
                                })
                              }
                            >
                              <option value="">Selecione</option>
                              <option value="fisica">Deficiência Física</option>
                              <option value="visual">Deficiência Visual</option>
                              <option value="auditiva">
                                Deficiência Auditiva
                              </option>
                              <option value="intelectual">
                                Deficiência Intelectual
                              </option>
                              <option value="multipla">
                                Deficiência Múltipla
                              </option>
                              <option value="outra">Outra</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Descreva sua deficiência{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                              rows={3}
                              placeholder="Descreva brevemente sua deficiência"
                              value={formData.pcdDescription}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  pcdDescription: e.target.value,
                                })
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* ETAPA 4: Acessibilidade */}
                  {step === 4 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Você precisa de algum recurso de acessibilidade
                          durante as aulas?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Ex: Intérprete de Libras, legendas, leitura de tela,
                          etc.
                        </p>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                          value={formData.needsAccessibility}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              needsAccessibility: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione</option>
                          <option value="interprete-libras">
                            Intérprete de Libras
                          </option>
                          <option value="legendas">Legendas</option>
                          <option value="leitura-tela">Leitura de Tela</option>
                          <option value="material-ampliado">
                            Material Ampliado
                          </option>
                          <option value="nao-preciso">
                            Não preciso de recursos especiais
                          </option>
                          <option value="outro">
                            Outro (especificar no próximo campo)
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ETAPA 5: Programa Social */}
                  {step === 5 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Você participa de algum programa social?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Ex: Bolsa Família, BPC, Auxílio Brasil, etc.
                        </p>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                          value={formData.socialProgram}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              socialProgram: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione</option>
                          <option value="bolsa-familia">Bolsa Família</option>
                          <option value="bpc">
                            BPC (Benefício de Prestação Continuada)
                          </option>
                          <option value="auxilio-brasil">Auxílio Brasil</option>
                          <option value="outro">Outro programa</option>
                          <option value="nao">
                            Não participo de nenhum programa
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ETAPA 6: Disponibilidade */}
                  {step === 6 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Qual é a sua disponibilidade para participar do curso?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Os cursos são 100% online e assíncronos, você pode
                          estudar no seu ritmo.
                        </p>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                          value={formData.availability}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              availability: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione</option>
                          <option value="manha">Manhã</option>
                          <option value="tarde">Tarde</option>
                          <option value="noite">Noite</option>
                          <option value="fins-de-semana">Fins de semana</option>
                          <option value="flexivel">Horário flexível</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ETAPA 7: Termos */}
                  {step === 7 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <input
                            type="checkbox"
                            id="confirmTruth"
                            className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                            checked={formData.confirmTruth}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmTruth: e.target.checked,
                              })
                            }
                          />
                          <label
                            htmlFor="confirmTruth"
                            className="text-xs text-gray-700 cursor-pointer"
                          >
                            Confirmo que todas as informações fornecidas são
                            verdadeiras e estou ciente de que a falsidade de
                            declarações pode resultar no cancelamento da minha
                            inscrição. <span className="text-red-500">*</span>
                          </label>
                        </div>

                        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <input
                            type="checkbox"
                            id="authorizeData"
                            className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                            checked={formData.authorizeData}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                authorizeData: e.target.checked,
                              })
                            }
                          />
                          <label
                            htmlFor="authorizeData"
                            className="text-xs text-gray-700 cursor-pointer"
                          >
                            Autorizo o uso dos meus dados pessoais para fins de
                            comunicação, inscrição e acompanhamento durante o
                            curso, conforme a LGPD.{" "}
                            <span className="text-red-500">*</span>
                          </label>
                        </div>

                        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <input
                            type="checkbox"
                            id="attendanceAgreement"
                            className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                            checked={formData.attendanceAgreement}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                attendanceAgreement: e.target.checked,
                              })
                            }
                          />
                          <label
                            htmlFor="attendanceAgreement"
                            className="text-xs text-gray-700 cursor-pointer"
                          >
                            Comprometo-me a participar ativamente das aulas e
                            atividades propostas, respeitando os prazos e as
                            orientações da equipe do BR CLICK.{" "}
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ETAPA 8: Como conheceu */}
                  {step === 8 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Como você conheceu o BR CLICK?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                          value={formData.discovery}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discovery: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="youtube">YouTube</option>
                          <option value="google">Google</option>
                          <option value="indicacao">
                            Indicação de amigos/familiares
                          </option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>

                      {formData.discovery === "outros" && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Por favor, especifique:{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Como você conheceu o BR CLICK?"
                            value={formData.discoveryOther}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                discoveryOther: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}

                      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          Pronto para começar!
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Revise suas informações e clique em Enviar Inscrição
                          para finalizar. Entraremos em contato em breve com as
                          próximas etapas.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões de Navegação */}
                <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Voltar
                    </button>
                  )}

                  {step < 8 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid(step) || isSubmitting}
                      className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Próxima Etapa
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid(8) || isSubmitting}
                      className="ml-auto flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin w-4 h-4 border-4 border-primary border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar Inscrição
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          {/* Sidebar de Contato */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    WhatsApp
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tutoria e suporte contínuo via WhatsApp durante toda sua
                    jornada.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Email
                  </h3>
                  <p className="text-xs text-gray-600 break-all">
                    contato@brclick.com.br
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Telefone
                  </h3>
                  <p className="text-xs text-gray-600">(11) 9999-9999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
