import { setupError } from 'porg'

export default () => {
  setupError({
    key: 'asset-not-found',
    statusCode: 404,
    translations: {
      en: 'The asset with id {id} was not found',
      pt: 'A peça com o id {id} não foi encontrada'
    }
  })

  setupError({
    key: 'names-dont-match',
    statusCode: 412,
    translations: {
      en: 'Your profile name {profileName} does not match with the one associated to the external profile: {externalProfileName}',
      pt: 'O nome do seu perfil {profileName} não corresponde ao nome associado ao perfil externo: {externalProfileName}'
    }
  })

  setupError({
    key: 'researcher-not-found',
    statusCode: 404,
    translations: {
      en: 'The researcher with username {userId} was not found.',
      pt: 'O investigador com o nome de utilizador {userId} não foi encontrado.'
    }
  })

  setupError({
    key: 'user-not-found',
    statusCode: 404,
    translations: {
      en: 'The user with userId {userId} was not found.',
      pt: 'O user com o id {userId} não foi encontrado.'
    }
  })

  setupError({
    key: 'user-already-has-email',
    statusCode: 412,
    translations: {
      en: 'The user with userId {userId} already has the email {email}',
      pt: 'O utilizador com o id {userId} já possui o email {email}'
    }
  })

  setupError({
    key: 'unable-to-delete-email',
    statusCode: 412,
    translations: {
      en: 'The user with userId {userId} cannot delete the email {email}',
      pt: 'O utilizador com o id {userId} não pode remover o email {email}'
    }
  })

  setupError({
    key: 'unable-to-change-primary-email',
    statusCode: 412,
    translations: {
      en: 'The user with userId {userId} cannot change the primary email to {email}',
      pt: 'O utilizador com o id {userId} não pode mudar o email primário para {email}'
    }
  })

  setupError({
    key: 'researcher-bio-not-found',
    statusCode: 404,
    translations: {
      en: 'The bio for the researcher with username {userId} was not found.',
      pt: 'A biografia para o investigador com o nome de utilizador {userId} não foi encontrada.'
    }
  })

  setupError({
    key: 'upload-session-not-found',
    statusCode: 404,
    translations: {
      en: 'The upload session with id={id} was not found.',
      pt: 'A sessão de upload com o id={id} não foi encontrada.'
    }
  })

  setupError({
    key: 'unsolved-upload-session-challenges',
    statusCode: 412,
    translations: {
      en: 'Unsolved session challenges.',
      pt: 'Os desafios para a sessão de upload não foram resolvidos.'
    }
  })

  setupError({
    key: 'invalid-file',
    statusCode: 412,
    translations: {
      en: 'Provided file has an invalid format.',
      pt: 'O ficheiro providenciado tem um formato inválido.'
    }
  })

  setupError({
    key: 'invalid-email-verification',
    statusCode: 412,
    translations: {
      en: 'Invalid email verification',
      pt: 'Verficação de email inválida'
    }
  })

  setupError({
    key: 'record-invalid-template',
    statusCode: 412,
    translations: {
      en: 'Invalid record template',
      pt: 'Template de record invalido'
    }
  })

  setupError({
    key: 'record-invalid',
    statusCode: 412,
    translations: {
      en: 'Invalid record',
      pt: 'Record invalido'
    }
  })

  setupError({
    key: 'record-not-found',
    statusCode: 412,
    translations: {
      en: 'Record not found',
      pt: 'Record não foi encontrado'
    }
  })

  setupError({
    key: 'users-not-valid',
    statusCode: 412,
    translations: {
      en: 'Record not found',
      pt: 'Record não foi encontrado'
    }
  })

  setupError({
    key: 'unit-not-found',
    statusCode: 412,
    translations: {
      en: 'Record not found',
      pt: 'Record não foi encontrado'
    }
  })

  setupError({
    key: 'parent-unit-not-found',
    statusCode: 412,
    translations: {
      en: 'Record not found',
      pt: 'Record não foi encontrado'
    }
  })

  setupError({
    key: 'unit-name-already-in-use',
    statusCode: 412,
    translations: {
      en: 'Record not found',
      pt: 'Record não foi encontrado'
    }
  })

  setupError({
    key: 'member-already-in-unit',
    statusCode: 412,
    translations: {
      en: 'Record not found',
      pt: 'Record não foi encontrado'
    }
  })

  setupError({
    key: 'member-not-in-unit',
    statusCode: 412,
    translations: {
      en: 'Record not found',
      pt: 'Record não foi encontrado'
    }
  })
}
