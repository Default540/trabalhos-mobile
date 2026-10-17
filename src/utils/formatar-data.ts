export function formatarDataHora(iso: string): string {
    const data = new Date(iso);
    const dia = data.toLocaleDateString('pt-BR');
    const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${dia} às ${hora}`;
}