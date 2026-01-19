import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import { useAuthStore } from '@/stores/auth'

describe('App.vue', () => {
	let auth
	let router

	beforeEach(() => {
		//limpar pinia
		setActivePinia(createPinia())
		auth = useAuthStore()

		router = createRouter({
			history: createWebHistory(),
			routes: [
				{ path: '/', component: { template: '<div>Home</div>' } },
				{ path: '/Dis', component: { template: '<div>Disciplinas</div>' } },
			],
		})
	})

	describe('rendering', () => {
		it('should show only public navigation links when user is not logged in', async () => {
			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.text()).toContain('Princípio')
			expect(wrapper.text()).not.toContain('Disciplinas')
			expect(wrapper.text()).toContain('Login')
		})

		it('should show private navigation links when user is logged in', async () => {
			auth.isLoggedIn = true
			auth.user = {
				email: 'teste@email.com',
				profilepic: 'img.png',
			}

			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.text()).toContain('Disciplinas')
			expect(wrapper.text()).toContain('Calendário')
			expect(wrapper.text()).toContain('teste@email.com')
			expect(wrapper.text()).toContain('Logout')
		})
	})

	describe('events', () => {
		it('should open login modal when login button is clicked', async () => {
			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.find('#loginForm').exists()).toBe(false)

			await wrapper.find('button.login-btn').trigger('click')

			expect(wrapper.find('#loginForm').exists()).toBe(true)
		})

		it('should logout user when logout button is clicked', async () => {
			auth.isLoggedIn = true
			auth.user = { email: 'teste@email.com' }

			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			})

			await wrapper.find('button.login-btn').trigger('click')

			expect(auth.isLoggedIn).toBe(false)
		})
	})

	describe('conditional rendering', () => {
		it('should not render user email when not logged in', () => {
			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.find('.SmallPfp').exists()).toBe(false)
		})

		it('should render user profile picture when logged in', () => {
			auth.isLoggedIn = true
			auth.user = {
				email: 'user@test.com',
				profilepic: 'pfp.png',
			}

			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			})

			expect(wrapper.find('.SmallPfp').exists()).toBe(true)
		})
	})
})