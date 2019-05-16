'use strict'

import * as permissions from '@/enum/permissions'
import { loadPage, loadLayout } from './helper'
import sections from '@/enum/sections'

/**
 * NOTE: Support meta permissions
 * @example
 * meta: {
 *   permissions: permissions.USER_VIEW, // check on includePermissions
 *   failRouteName: 'home' // go to this route name, if permissions not found
 * }
 */

/** @type {object} */
const notAuthorizedRoutes = {
  path: `/${sections.auth}`,
  component: loadLayout('NotAuthorized'),
  children: [
    {
      path: '/',
      name: sections.auth,
      component: loadPage('Auth')
    }
  ]
}

/** @type {object} */
const authorizedRoutes = {
  path: '',
  component: loadLayout('Default'),
  children: [
    {
      path: '/',
      name: sections.home,
      component: loadPage('Home')
    },
    // ------------------------------------------------ Requests
    {
      path: `/${sections.requests}`,
      name: sections.requests,
      component: loadPage('requests/Index'),
      meta: { permissions: [permissions.REQUESTS_VIEW, permissions.REQUESTS_CREATE] }
    },
    {
      path: `/${sections.requests}/:id(\\d+)`,
      name: `${sections.requests}-id`,
      component: loadPage('requests/One')
      // Permissions - check on the page
    },
    {
      path: `/${sections.requests}/create`,
      name: `${sections.requests}-create`,
      component: loadPage('requests/Create'),
      meta: { permissions: permissions.REQUESTS_CREATE, failRouteName: sections.requests }
    },
    // ------------------------------------------------ Users
    {
      path: `/${sections.users}`,
      name: sections.users,
      component: loadPage('users/Index'),
      meta: { permissions: permissions.USERS_VIEW }
    },
    {
      path: `/${sections.users}/:id(\\d+)`,
      name: `${sections.users}-id`,
      component: loadPage('users/One'),
      meta: { permissions: permissions.USERS_VIEW }
    },
    {
      path: `/${sections.users}/create`,
      name: `${sections.users}-create`,
      component: loadPage('users/Create'),
      meta: { permissions: permissions.USERS_CREATE, failRouteName: sections.users }
    },
    // ------------------------------------------------ Roles
    {
      path: `/${sections.roles}`,
      name: sections.roles,
      component: loadPage('roles/Index'),
      meta: { permissions: permissions.ROLES_VIEW }
    },
    {
      path: `/${sections.roles}/:id(\\d+)`,
      name: `${sections.roles}-id`,
      component: loadPage('roles/One'),
      meta: { permissions: permissions.ROLES_VIEW }
    },
    {
      path: `/${sections.roles}/create`,
      name: `${sections.roles}-create`,
      component: loadPage('roles/Create'),
      meta: { permissions: permissions.ROLES_VIEW, failRouteName: sections.roles }
    },
    // ------------------------------------------------ Equipments
    {
      path: `/${sections.equipments}`,
      name: sections.equipments,
      component: loadPage('equipments/Index'),
      meta: { permissions: permissions.EQUIPMENTS_VIEW }
    },
    {
      path: `/${sections.equipments}/:id(\\d+)`,
      name: `${sections.equipments}-id`,
      component: loadPage('equipments/One'),
      meta: { permissions: permissions.EQUIPMENTS_VIEW }
    },
    {
      path: `/${sections.equipments}/create`,
      name: `${sections.equipments}-create`,
      component: loadPage('equipments/Create'),
      meta: { permissions: permissions.EQUIPMENTS_CREATE, failRouteName: sections.equipments }
    },
    // ------------------------------------------------ Settings
    {
      path: `/${sections.settings}`,
      component: loadPage('settings/Core'),
      children: [
        {
          path: `/${sections.settings}`,
          name: sections.settings,
          component: loadPage('settings/Index'),
          meta: { permissions: [
            permissions.GLOBAL_SETTINGS,
            permissions.GLOBAL_MANIFEST,
            permissions.REQUESTS_CONFIG_VIEW,
            permissions.EQUIPMENTS_CONFIG_VIEW
          ]}
        },
        {
          path: `/${sections.settings}/global`,
          name: sections.settingsGlobal,
          component: loadPage('settings/Global'),
          meta: { permissions: permissions.GLOBAL_SETTINGS, failRouteName: sections.settings }
        },
        {
          path: `/${sections.settings}/manifest`,
          name: sections.settingsManifest,
          component: loadPage('settings/Manifest'),
          meta: { permissions: permissions.GLOBAL_MANIFEST, failRouteName: sections.settings }
        },
        // ------------------------------------------------ Settings - Requests
        {
          path: `/${sections.settings}/${sections.requestsStatuses}`,
          name: `${sections.requestsStatuses}`,
          component: loadPage('settings/requests/Statuses'),
          meta: { permissions: permissions.REQUESTS_CONFIG_VIEW, failRouteName: sections.settings }
        },
        {
          path: `/${sections.settings}/${sections.requestsPriorities}`,
          name: `${sections.requestsPriorities}`,
          component: loadPage('settings/requests/Priorities'),
          meta: { permissions: permissions.REQUESTS_CONFIG_VIEW, failRouteName: sections.settings }
        },
        {
          path: `/${sections.settings}/${sections.requestsTypes}`,
          name: `${sections.requestsTypes}`,
          component: loadPage('settings/requests/Types'),
          meta: { permissions: permissions.REQUESTS_CONFIG_VIEW, failRouteName: sections.settings }
        },
        // ------------------------------------------------ Settings - Equipments
        {
          path: `/${sections.settings}/${sections.equipmentsManufacturers}`,
          name: `${sections.equipmentsManufacturers}`,
          component: loadPage('settings/equipments/Manufacturers'),
          meta: { permissions: permissions.EQUIPMENTS_CONFIG_VIEW, failRouteName: sections.settings }
        },
        {
          path: `/${sections.settings}/${sections.equipmentsTypes}`,
          name: `${sections.equipmentsTypes}`,
          component: loadPage('settings/equipments/Types'),
          meta: { permissions: permissions.EQUIPMENTS_CONFIG_VIEW, failRouteName: sections.settings }
        },
        {
          path: `/${sections.settings}/${sections.equipmentsModels}`,
          name: `${sections.equipmentsModels}`,
          component: loadPage('settings/equipments/Models'),
          meta: { permissions: permissions.EQUIPMENTS_CONFIG_VIEW, failRouteName: sections.settings }
        }
      ]
    },
    {
      path: '*',
      redirect: { name: sections.home }
    }
  ]
}

/**
 * For route guard.
 * @type {array}
 */
export const notAuthorizedRoutesName = notAuthorizedRoutes.children
  .map(route => route.name)

export default [
  notAuthorizedRoutes,
  authorizedRoutes
]
