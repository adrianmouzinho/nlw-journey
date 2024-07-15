import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: Date | string, dateFormat: string) {
  return format(date, dateFormat, { locale: ptBR })
}
