import { test, expect } from '@playwright/test'

test.describe('首页推荐菜 - E2E 验收测试', () => {
  test('REQ-001: 首页第一屏展示 3 道推荐菜卡片，含图片/名称/价格/徽章', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/#\/home$/)

    // 推荐区域标题与副标题
    await expect(page.getByRole('heading', { name: '今日推荐' })).toBeVisible()
    await expect(page.getByText('选桌后即刻开始点餐')).toBeVisible()

    // 推荐菜卡片（article 元素）
    const recommendCards = page.locator('main article')
    await expect(recommendCards).toHaveCount(3)

    // 每张卡片至少展示名称、价格（含"起"）
    const expectedNames = ['鎏金番茄鸳鸯锅', '牛油麻辣锅', '琥珀嫩牛肉']
    for (let i = 0; i < 3; i++) {
      const card = recommendCards.nth(i)
      await expect(card.getByRole('heading', { name: expectedNames[i] })).toBeVisible()
      await expect(card.getByText('起')).toBeVisible()
      // 图片存在
      await expect(card.locator('img')).toBeVisible()
    }
  })

  test('REQ-002: 推荐菜按 badge 优先选取，展示 p1/p2/p3 及对应徽章', async ({ page }) => {
    await page.goto('/')

    const recommendCards = page.locator('main article')
    await expect(recommendCards).toHaveCount(3)

    // p1 人气 No.1、p2 招牌、p3 主厨推荐
    await expect(recommendCards.nth(0).getByText('人气 No.1')).toBeVisible()
    await expect(recommendCards.nth(0).getByRole('heading', { name: '鎏金番茄鸳鸯锅' })).toBeVisible()

    await expect(recommendCards.nth(1).getByText('招牌')).toBeVisible()
    await expect(recommendCards.nth(1).getByRole('heading', { name: '牛油麻辣锅' })).toBeVisible()

    await expect(recommendCards.nth(2).getByText('主厨推荐')).toBeVisible()
    await expect(recommendCards.nth(2).getByRole('heading', { name: '琥珀嫩牛肉' })).toBeVisible()
  })

  test('REQ-003: 推荐菜不影响桌台绑定，绑桌后推荐菜消失', async ({ page }) => {
    await page.goto('/')

    // 推荐菜可见时，桌台绑定按钮仍可操作
    const bindButton = page.getByRole('button', { name: /A08/ }).first()
    await expect(bindButton).toBeVisible()
    await expect(page.getByRole('heading', { name: '今日推荐' })).toBeVisible()

    // 点击绑定 A08 桌台，进入欢迎页
    await bindButton.click()
    await expect(page).toHaveURL(/#\/welcome$/)

    // 推荐菜区域随首页消失
    await expect(page.getByRole('heading', { name: '今日推荐' })).not.toBeVisible()
  })
})
