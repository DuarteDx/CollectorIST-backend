import GetProfileController from './controllers/GetProfileController'
import UpdateProfileController from './controllers/UpdateProfileController'

import AddFundingController from './controllers/fundings/AddFundingController'
import RemoveFundingController from './controllers/fundings/RemoveFundingController'
import UpdateFundingController from './controllers/fundings/UpdateFundingController'

import OAuthExternalProfileProviderController from './controllers/external-profiles/OAuthExternalProfileProviderController'
import SyncExternalProfileProviderController from './controllers/external-profiles/SyncExternalProfileProviderController'
import RemoveExternalProfileController from './controllers/external-profiles/RemoveExternalProfileController'
import GetExternalProfilesController from './controllers/external-profiles/GetExternalProfilesController'

import GetAliasesController from './controllers/aliases/GetAliasesController'
import RemoveAliasController from './controllers/aliases/RemoveAliasController'

import GetProfileSettingsController from './controllers/GetProfileSettingsController'

import AddAffiliationController from './controllers/affiliations/AddAffiliationController'
import RemoveAffiliationController from './controllers/affiliations/RemoveAffiliationController'

import GetEmailsController from './controllers/emails/GetEmailsController'
import AddEmailController from './controllers/emails/AddEmailController'
import RemoveEmailController from './controllers/emails/RemoveEmailController'
import UpdateEmailController from './controllers/emails/UpdateEmailController'
import AddEmailVerificationRequestController from './controllers/emails/AddEmailVerificationRequestController'

import SaveExternalProfileKeyController from './controllers/external-profiles/SaveExternalProfileKeyController'

export const plugin = {
  name: 'profile-plugin',
  version: '1.0.0',
  route: '/api/v1/profile',
  register: function (server, options) {
    server.route({
      path: '/',
      method: 'GET',
      ...GetProfileController
    })

    server.route({
      path: '/',
      method: 'PUT',
      ...UpdateProfileController
    })

    server.route({
      path: '/fundings',
      method: 'POST',
      ...AddFundingController
    })

    server.route({
      path: '/fundings/{id}',
      method: 'PUT',
      ...UpdateFundingController
    })

    server.route({
      path: '/fundings/{id}',
      method: 'DELETE',
      ...RemoveFundingController
    })

    server.route({
      path: '/aliases',
      method: 'GET',
      ...GetAliasesController
    })

    server.route({
      path: '/aliases/{alias}',
      method: 'GET',
      ...RemoveAliasController
    })

    server.route({
      path: '/settings',
      method: 'GET',
      ...GetProfileSettingsController
    })

    server.route({
      path: '/emails',
      method: 'GET',
      ...GetEmailsController
    })

    server.route({
      path: '/emails',
      method: 'POST',
      ...AddEmailController
    })

    server.route({
      path: '/emails/{id}',
      method: 'DELETE',
      ...RemoveEmailController
    })

    server.route({
      path: '/emails/{id}',
      method: 'PUT',
      ...UpdateEmailController
    })

    server.route({
      path: '/emails/{id}/verification-requests',
      method: 'POST',
      ...AddEmailVerificationRequestController
    })

    server.route({
      path: '/affiliations',
      method: 'POST',
      ...AddAffiliationController
    })

    server.route({
      path: '/affiliations/{id}',
      method: 'DELETE',
      ...RemoveAffiliationController
    })

    server.route({
      path: '/external-profiles',
      method: 'GET',
      ...GetExternalProfilesController
    })

    server.route({
      path: '/external-profiles/{provider}/oauth/callback',
      method: 'GET',
      ...OAuthExternalProfileProviderController
    })

    server.route({
      path: '/external-profiles/{provider}/key/{key*}',
      method: 'PUT',
      ...SaveExternalProfileKeyController
    })

    server.route({
      path: '/external-profiles/{provider}/sync',
      method: 'PUT',
      ...SyncExternalProfileProviderController
    })

    server.route({
      path: '/external-profiles/{provider}',
      method: 'DELETE',
      ...RemoveExternalProfileController
    })
  }
}
