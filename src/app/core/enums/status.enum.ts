export enum EStatus {
  UNDER_REVIEW = 'En revisión',
  PENDING = 'Pendiente de aprobación',
  APPROVED = 'Aprobado',
  REJECT = 'Rechazado',
  ACTIVE = 'Activa',
  // Registrado, pero falta confirmar el correo o teléfono.
  PENDING_VERIFICATION = 'Pendiente de Verificación',
  // Acceso restringido tempralmente por violación de términos o seguridad.
  SUSPENDED = 'Suspendida',
  // Acceso restringido permanentemente por violación de términos o seguridad.
  BANNED = 'Bloqueado',
}
